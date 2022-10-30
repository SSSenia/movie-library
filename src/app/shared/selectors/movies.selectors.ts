import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MoviesState } from "../reducers/movies.reducer";

export const featureSelector = createFeatureSelector<MoviesState>('movies');
export const moviesSelector = {
    getFullData: createSelector(
        featureSelector,
        (state) => state.fullData
    ),
    getIsFound: createSelector(
        featureSelector,
        (state) => state.isFound
    ),
    getPosterByTitle: (title: string) => createSelector(
        featureSelector,
        (state) => {
            const search = state.posters.find(poster => poster.movieTitle === title);
            return search ? search : null;
        }
    ),
    getImagePosterByTitle: (title: string) => createSelector(
        featureSelector,
        (state) => {
            const search = state.posters.find(poster => poster.movieTitle === title);
            return search ? search.imageUrl : null;
        }
    ),
    getById: (id: number) => createSelector(
        featureSelector,
        (state) => {
            const search = state.movies.find(movie => +movie.url.split('/').slice(-2)[0] == id);
            return search ? search : null;
        }
    )
};