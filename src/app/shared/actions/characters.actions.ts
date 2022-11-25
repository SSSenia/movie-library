import { createAction, props } from "@ngrx/store";
import { ICharacter } from "../interfaces/characters";

export const charactersActions = {
    setItem: createAction(
        '[Characters] Set Item',
        props<{ char: ICharacter }>()
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
        '[Characters] Loaded Count',
        props<{ count: number, characters: ICharacter[] }>()
    ),
    loadCurrentListFromRange: createAction(
        '[Characters] Load Current Range',
        props<{ from: number, to: number, key: string }>()
    ),
    loadCurrentListFromArray: createAction(
        '[Characters] Load Current List',
        props<{ request: string[], key: string }>()
    ),
    loadedCharacterToCurrentList: createAction(
        '[Characters] Current Range Loaded',
        props<{ char: ICharacter | null, key: string }>()
    ),
    notFound: createAction('[Characters] Character Not Found'),
    found: createAction('[Characters] Character Found')
}
