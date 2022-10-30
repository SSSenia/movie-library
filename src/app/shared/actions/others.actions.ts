import { createAction, props } from "@ngrx/store";
import { IPlanet } from "../interfaces/others";

export const othersActions = {
    loadPlanetByAdress: createAction(
        '[Others] Load Planet By Adress',
        props<{ url: string }>()
    ),
    loadedPlanetByAdress: createAction(
        '[Others] Loaded Planet By Adress',
        props<IPlanet>()
    )
}