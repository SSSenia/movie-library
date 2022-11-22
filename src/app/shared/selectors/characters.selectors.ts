import { state } from "@angular/animations";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICharacter } from "../interfaces/characters";
import { CharactersState } from "../reducers/characters.reducer";

export const featureSelector = createFeatureSelector<CharactersState>('characters');
export const charactersSelector = {
    count: createSelector(
        featureSelector,
        state => state.count
    ),
    list: createSelector(
        featureSelector,
        state => state.currentList
    ),
    loadedNeed: createSelector(
        featureSelector,
        state => state.loadedNeed
    ),
    loadedNow: createSelector(
        featureSelector,
        state => state.loadedNow
    ),
    getParsedArray: createSelector(
        featureSelector,
        state => state.parsedArray
    ),
    getIsFound: createSelector(
        featureSelector,
        state => state.isFound
    ),
    search: createSelector(
        featureSelector,
        state => !state.request.trim() ?
            [] : state.parsedArray
                .filter((character: ICharacter) => character.name.toLowerCase().includes(state.request.toLowerCase()))
    ),
    getById: (id: number) => createSelector(
        featureSelector,
        state => {
            const search = state.parsedArray.find(c => c.id === id)
            return search ? search : null;
        }
    )
};