import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { CharactersReducer, CharactersState } from './characters.reducer';
import { MoviesReducer, MoviesState } from './movies.reducer';
import { OthersReducer, OthersState } from './others.reducer';

export interface State {
  characters: CharactersState;
  movies: MoviesState,
  others: OthersState
}

export const reducers: ActionReducerMap<State> = {
  characters: CharactersReducer,
  movies: MoviesReducer,
  others: OthersReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];