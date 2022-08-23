import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { concatMap, from, mergeMap, Observable, switchMap, scan, catchError } from 'rxjs';
import { ICharacter } from 'src/app/shared/interfaces/characters';
import { IMovie } from 'src/app/shared/interfaces/movies';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { OthersService } from 'src/app/shared/services/others.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies-detailed-page',
  templateUrl: './movies-detailed-page.component.html',
  styleUrls: ['./movies-detailed-page.component.scss']
})
export class MoviesDetailedPageComponent {

  movie!: IMovie;
  characters: Array<ICharacter> = [];
  errorCatch: boolean = false;
  imagesUrl: string = environment.imagesUrl;
  response$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private othersService: OthersService
  ) {

    this.response$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.moviesService.getById(params['id']);
      }),

      concatMap((movie: IMovie) => {
        this.movie = movie;
        return from(this.movie.characters)
      }),
      
      mergeMap((character: string) => {
        return this.othersService.getCharacterByAdress(character);
      }),
      
      scan((acc: ICharacter[], curr: ICharacter) => {
        acc.push(curr)
        return acc;
      }, new Array<ICharacter>),

      catchError(() => new Observable(subscriber => {
        this.errorCatch = true;
        subscriber.complete();
      }))
    );
  }
}
