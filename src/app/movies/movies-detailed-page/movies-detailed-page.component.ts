import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { charactersActions } from 'src/app/shared/actions/characters.actions';
import { moviesActions } from 'src/app/shared/actions/movies.actions';
import { ICharacter } from 'src/app/shared/interfaces/characters';
import { IMovie } from 'src/app/shared/interfaces/movies';
import { charactersSelector } from 'src/app/shared/selectors/characters.selectors';
import { moviesSelector } from 'src/app/shared/selectors/movies.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies-detailed-page',
  templateUrl: './movies-detailed-page.component.html',
  styleUrls: ['./movies-detailed-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesDetailedPageComponent implements OnInit {

  public imagesUrl: string = environment.imagesUrl;

  public movie$!: Observable<IMovie | null>;
  public characters$: Observable<Array<ICharacter | null>> = this.store.select(charactersSelector.list);
  public isFound$: Observable<boolean> = this.store.select(moviesSelector.getIsFound);

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(moviesActions.found());
    this.store.dispatch(moviesActions.loadById({ id }));
    this.movie$ = this.store.select(moviesSelector.getById(id)).pipe(
      map((movie: IMovie | null) => {
        if (!movie) return null;
        this.store.dispatch(charactersActions.loadCurrentListFromArray({ request: movie.characters, key: 'movie' + id }));
        return movie
      })
    );
  }
}
