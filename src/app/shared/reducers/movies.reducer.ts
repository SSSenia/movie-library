import { createReducer, on } from "@ngrx/store";
import { moviesActions } from "../actions/movies.actions";
import { IMovie } from "../interfaces/movies";

export interface MoviesState {
    isAllLoaded: boolean;
    movies: IMovie[];
    isFound: boolean;
    currentList: IMovie[]
}

export const initialState: MoviesState = {
    isAllLoaded: false,
    movies: [],
    isFound: true,
    currentList: []
};

export const MoviesReducer = createReducer(
    initialState,
    on(moviesActions.loadedAll, (state) => ({
        ...state,
        isAllLoaded: true
    })),
    on(moviesActions.loadedById, (state, movie) => ({
        ...state,
        movies: state.movies.find(x => x.episode_id === movie.episode_id) ? state.movies : state.movies.concat([movie])
    })),
    on(moviesActions.found, (state) => ({
        ...state,
        isFound: true
    })),
    on(moviesActions.notFound, (state) => ({
        ...state,
        isFound: false
    })),
    on(moviesActions.loadCurrentListFromArray, (state,) => ({
        ...state,
        currentList: []
    })),
    on(moviesActions.loadedCharacterToCurrentList, (state, { movie }) => ({
        ...state,
        currentList: movie ? state.currentList.concat([movie]) : state.currentList
    })),
);