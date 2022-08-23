import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, concatMap, from, map, mergeMap, Observable, scan, switchMap } from 'rxjs';
import { ICharacter } from 'src/app/shared/interfaces/characters';
import { IMovie } from 'src/app/shared/interfaces/movies';
import { IPlanet } from 'src/app/shared/interfaces/others';
import { CharactersService } from 'src/app/shared/services/characters.service';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { OthersService } from 'src/app/shared/services/others.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-characters-detailed-page',
  templateUrl: './characters-detailed-page.component.html',
  styleUrls: ['./characters-detailed-page.component.scss']
})
export class CharactersDetailedPageComponent {

  character!: ICharacter;
  planet!: IPlanet;
  errorCatch: boolean = false;
  imagesUrl: string = environment.imagesUrl;
  response$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private othersService: OthersService,
    public moviesService: MoviesService
  ) {

    this.response$ = this.route.params.pipe(
      switchMap((params: Params) => this.charactersService.getById(params['id'])),

      concatMap((character: ICharacter) => {
        this.character = character;
        return this.othersService.getPlanetByAdress(character.homeworld);
      }),

      map((planet: IPlanet) => this.planet = planet),

      concatMap(() => from(this.character.films)),

      mergeMap((urlMovie: string) => moviesService.getById(+urlMovie.split('/').slice(-2)[0])),

      scan((acc: IMovie[], movie: IMovie) => {
        acc.push(movie);
        return acc;
      }, new Array<IMovie>),

      catchError(() => {
        return new Observable(subscriber => {
        this.errorCatch = true;
        subscriber.complete;
      })})
    );
  }
}
