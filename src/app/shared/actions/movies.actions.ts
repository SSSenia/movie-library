import { createAction, props } from "@ngrx/store";
import { IMovie } from "../interfaces/movies";

export const moviesActions = {
    loadAll: createAction('[Movies] Load All'),
    loadById: createAction(
        '[Movies] Load By Id',
        props<{ id: number }>()
    ),
    loadedAll: createAction(
        '[Movies] Loaded All'
    ),
    loadedById: createAction(
        '[Movies] Loaded By Id',
        props<IMovie>()
    ),
    loadCurrentListFromArray: createAction(
        '[Characters] Load Current List',
        props<{ request: string[] }>()
    ),
    loadedCharacterToCurrentList: createAction(
        '[Characters] Current Range Loaded',
        props<{ movie: IMovie | null }>()
    ),
    notFound: createAction('[Movies] Movie Not Found'),
    found: createAction('[Movies] Movie found')
}