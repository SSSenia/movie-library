import { createAction, props } from "@ngrx/store";
import { IArrayDataMovie, IMovie, IPoster } from "../interfaces/movies";

export const moviesActions = {
    loadAll: createAction('[Movies] Load All'),
    loadById: createAction(
        '[Movies] Load By Id',
        props<{ id: number }>()
    ),
    loadedAll: createAction(
        '[Movies] Loaded All',
        props<{ fullData: IArrayDataMovie }>()
    ),
    loadedById: createAction(
        '[Movies] Loaded By Id',
        props<IMovie>()
    ),
    loadPoster: createAction(
        '[Movies] Load Poster Of Film',
        props<IMovie>()
    ),
    loadedPoster: createAction(
        '[Movies] Loaded Poster Of Film',
        props<IPoster>()
    ),
    notFound: createAction('[Movies] Movie Not Found'),
    found: createAction('[Movies] Movie found')
}