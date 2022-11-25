import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MoviesState } from "../reducers/movies.reducer";

export const featureSelector = createFeatureSelector<MoviesState>('movies');
export const moviesSelector = {
    list: createSelector(
        featureSelector,
        state => state.currentList
    ),
    getAll: createSelector(
        featureSelector,
        (state) => state.movies
    ),
    getIsAllLoaded: createSelector(
        featureSelector,
        (state) => state.isAllLoaded
    ),
    getIsFound: createSelector(
        featureSelector,
        (state) => state.isFound
    ),
    getById: (id: number) => createSelector(
        featureSelector,
        (state) => {
            const search = state.movies.find(movie => +movie.url.split('/').slice(-2)[0] == id);
            return search ? search : null;
        }
    )
};