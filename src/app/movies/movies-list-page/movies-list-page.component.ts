import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { moviesActions } from 'src/app/shared/actions/movies.actions';
import { IArrayDataMovie } from 'src/app/shared/interfaces/movies';
import { moviesSelector } from 'src/app/shared/selectors/movies.selectors';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-list-page.component.html',
  styleUrls: ['./movies-list-page.component.scss']
})
export class MoviesListPageComponent {

  public response$: Observable<IArrayDataMovie | undefined> = this.store.select(moviesSelector.getFullData);

  constructor(private store: Store) {
    this.store.dispatch(moviesActions.loadAll());
  }
}