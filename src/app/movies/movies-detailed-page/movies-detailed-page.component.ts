import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, from, mergeMap, Observable, catchError, EMPTY, toArray } from 'rxjs';
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
  errorCatch: boolean = false;
  imagesUrl: string = environment.imagesUrl;
  response$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private othersService: OthersService
  ) {

    this.response$ = this.moviesService.getById(this.route.snapshot.params['id']).pipe(

      concatMap((movie: IMovie) => {
        this.movie = movie;
        return from(this.movie.characters)
      }),

      mergeMap((character: string) => {
        return this.othersService.getCharacterByAdress(character);
      }),
      
      toArray(),

      catchError(() => {
        this.errorCatch = true;
        return EMPTY;
      })
    );
  }
}
