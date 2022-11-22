import { createAction, props } from "@ngrx/store";
import { ICharacter } from "../interfaces/characters";

export const charactersActions = {
    setItem: createAction(
        '[Characters] Set Item',
        props<{ character: ICharacter }>()
    ),
    setRequest: createAction(
        '[Characters] Set Request',
        props<{ request: string }>()
    ),
    loadById: createAction(
        '[Characters] Load By Id',
        props<{ id: number }>()
    ),
    loadCount: createAction('[Characters] Load Count'),
    loadedCount: createAction(
        '[Charactes] Loaded Count',
        props<{ count: number }>()
    ),
    loadCurrentRange: createAction(
        '[Characters] Load Current Range',
        props<{ from: number, to: number }>()
    ),
    loadedCurrentRange: createAction(
        '[Characters] Current Range Loaded',
        props<{ char: ICharacter | null }>()
    ),
    notFound: createAction('[Characters] Character Not Found'),
    found: createAction('[Characters] Character Found')
}
