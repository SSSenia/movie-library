import { createReducer, on } from "@ngrx/store";
import { othersActions } from "../actions/others.actions";
import { IPlanet } from "../interfaces/others";

export interface OthersState {
    planets: IPlanet[];
};

export const initialState: OthersState = {
    planets: []
};

export const OthersReducer = createReducer(
    initialState,
    on(othersActions.loadedPlanetByAdress, (state, planet) => ({
        ...state,
        planets: state.planets.find(x => x.url === planet.url) ? state.planets : state.planets.concat([planet])
    }))
);