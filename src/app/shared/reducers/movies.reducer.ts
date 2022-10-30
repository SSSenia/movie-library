import { createReducer, on } from "@ngrx/store";
import { moviesActions } from "../actions/movies.actions";
import { IArrayDataMovie, IMovie, IPoster } from "../interfaces/movies";

export interface MoviesState {
    fullData?: IArrayDataMovie;
    movies: IMovie[];
    isFound: boolean;
    posters: IPoster[];
}

export const initialState: MoviesState = {
    movies: [],
    isFound: true,
    posters: []
};

export const MoviesReducer = createReducer(
    initialState,
    on(moviesActions.loadedAll, (state, { fullData }) => ({
        ...state,
        fullData: fullData,
        movies: fullData.results
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
    on(moviesActions.loadedPoster, (state, poster) => ({
        ...state,
        posters: state.posters.find(x => x.movieTitle === poster.movieTitle) ? state.posters : state.posters.concat([poster])
    }))
);