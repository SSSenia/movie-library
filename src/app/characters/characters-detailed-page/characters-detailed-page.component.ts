import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, concatMap, EMPTY, from, map, Observable } from 'rxjs';
import { charactersActions } from 'src/app/shared/actions/characters.actions';
import { moviesActions } from 'src/app/shared/actions/movies.actions';
import { othersActions } from 'src/app/shared/actions/others.actions';
import { ICharacter } from 'src/app/shared/interfaces/characters';
import { IMovie } from 'src/app/shared/interfaces/movies';
import { IPlanet } from 'src/app/shared/interfaces/others';
import { charactersSelector } from 'src/app/shared/selectors/characters.selectors';
import { moviesSelector } from 'src/app/shared/selectors/movies.selectors';
import { othersSelector } from 'src/app/shared/selectors/others.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-characters-detailed-page',
  templateUrl: './characters-detailed-page.component.html',
  styleUrls: ['./characters-detailed-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersDetailedPageComponent implements OnInit {

  public character!: ICharacter;
  public imagesUrl: string = environment.imagesUrl;
  public movies: Observable<IMovie | null>[] = [];

  public response$!: Observable<boolean>;
  public planet$!: Observable<IPlanet | null>;
  public isFound$: Observable<boolean> = this.store.select(charactersSelector.getIsFound);

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(charactersActions.loadById({ id: this.route.snapshot.params['id'] }));

    this.response$ = this.store.select<ICharacter[]>(charactersSelector.getParsedArray).pipe(
      concatMap((characters: ICharacter[]) => {
        const search = characters.find(x => x.id == this.route.snapshot.params['id'])
        if (!search) return EMPTY;
        this.character = search;
        this.store.dispatch(othersActions.loadPlanetByAdress({ url: search.homeworld }))
        this.planet$ = this.store.select(othersSelector.getPlanetByUrl(search.homeworld));
        return from(this.character.films)
      }),

      map((urlMovie: string) => {
        const movieId = +urlMovie.split('/').slice(-2)[0];
        this.store.dispatch(moviesActions.loadById({ id: movieId }));
        this.movies.push(this.store.select(moviesSelector.getById(movieId)));
        return true;
      }),

      catchError(() => EMPTY)
    );
  }
}
