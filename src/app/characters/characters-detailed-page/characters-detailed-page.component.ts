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

  public imagesUrl: string = environment.imagesUrl;

  public character$!: Observable<ICharacter | undefined>;
  public planet$!: Observable<IPlanet | null>;
  public movies$: Observable<Array<IMovie | null>> = this.store.select(moviesSelector.list);
  public isFound$: Observable<boolean> = this.store.select(charactersSelector.getIsFound);

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.store.dispatch(moviesActions.loadAll());
    this.store.dispatch(charactersActions.found());
    this.store.dispatch(charactersActions.loadById({ id }));

    this.character$ = this.store.select<ICharacter | undefined>(charactersSelector.getById(id)).pipe(
      map((character: ICharacter | undefined) => {
        if(!character) return undefined;
        this.store.dispatch(othersActions.loadPlanetByAdress({ url: character.homeworld }))
        this.store.dispatch(moviesActions.loadCurrentListFromArray({ request: character.films }));
        this.planet$ = this.store.select(othersSelector.getPlanetByUrl(character.homeworld));
        return character;
      })
    );
  }
}
