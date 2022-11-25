import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { moviesActions } from 'src/app/shared/actions/movies.actions';
import { IMovie } from 'src/app/shared/interfaces/movies';
import { moviesSelector } from 'src/app/shared/selectors/movies.selectors';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-list-page.component.html',
  styleUrls: ['./movies-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListPageComponent implements OnInit {

  public response$: Observable<IMovie[] | undefined> = this.store.select(moviesSelector.getAll);

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.store.dispatch(moviesActions.loadAll());
  }
}