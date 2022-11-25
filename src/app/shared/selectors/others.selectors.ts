import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OthersState } from "../reducers/others.reducer";

export const featureSelector = createFeatureSelector<OthersState>('others')
export const othersSelector = {
    getPlanetByUrl: (url: string) => createSelector(
        featureSelector,
        state => {
            const search = state.planets.find(planet => planet.url === url);
            return search ? search : null;
        }
    )
}