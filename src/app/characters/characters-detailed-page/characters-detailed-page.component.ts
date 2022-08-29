import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, concatMap, EMPTY, from, map, mergeMap, Observable, toArray } from 'rxjs';
import { ICharacter } from 'src/app/shared/interfaces/characters';
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

    this.response$ = this.charactersService.getById(this.route.snapshot.params['id']).pipe(

      concatMap((character: ICharacter) => {
        this.character = character;
        return this.othersService.getPlanetByAdress(character.homeworld);
      }),

      map((planet: IPlanet) => this.planet = planet),

      concatMap(() => from(this.character.films)),

      mergeMap((urlMovie: string) => moviesService.getById(+urlMovie.split('/').slice(-2)[0])),

      toArray(),

      catchError(() => {
        this.errorCatch = true;
        return EMPTY;
      })
    );
  }
}
