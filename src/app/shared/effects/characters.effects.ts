import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, EMPTY, from, map, mergeMap, of, range, switchMap, tap } from "rxjs";
import { charactersActions } from "../actions/characters.actions";
import { IArrayDataCharacter, ICharacter } from "../interfaces/characters";
import { charactersSelector } from "../selectors/characters.selectors";
import { CharactersService } from "../services/characters.service";

@Injectable()
export class CharactersEffects {

    private loadCount$ = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadCount),
            switchMap(() => this.store.select(charactersSelector.count)),
            concatMap((count) => count ? EMPTY : this.charactersService.getAll()
                .pipe(
                    map((data: IArrayDataCharacter) => charactersActions.loadedCount(
                        {
                            count: data.count,
                            characters: data.results.map(character => {
                                character.id = +character.url.split('/').slice(-2)[0];
                                return character;
                            })
                        }
                    )),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    private loadById$ = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadById),
            mergeMap((value) => this.store.select(charactersSelector.getById(value.id)).pipe(
                switchMap((character: ICharacter | undefined) => character ? EMPTY : this.charactersService.getById(value.id))
            )),
            map((char) => charactersActions.setItem({ char })),
            catchError(() => {
                this.store.dispatch(charactersActions.notFound());
                return EMPTY;
            })
        )
    );

    private loadListByRange$ = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadCurrentListFromRange),
            switchMap(({ from, to, key }) => this.store.select(charactersSelector.count).pipe(
                switchMap((count) =>
                    range(
                        from,
                        (to > count ? count : to) - from + 1)
                ),
                mergeMap((id: number) => this.store.select(charactersSelector.getById(id))
                    .pipe(switchMap((char) => char ? of(char) : this.charactersService.getById(id)
                        .pipe(
                            tap((char) => this.store.dispatch(charactersActions.setItem({ char })))
                        )
                    ),
                        map((char: ICharacter | null) => charactersActions.loadedCharacterToCurrentList({ char, key })),
                        catchError(() => of(charactersActions.loadedCharacterToCurrentList({ char: null, key })))
                    )
                )
            )
            ),

        )
    );

    private loadListByArray$ = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadCurrentListFromArray),
            switchMap(({ request, key }) => from(request.map(x => +x.split('/').slice(-2)[0])).pipe(
                mergeMap((id) => this.store.select(charactersSelector.getById(id)).pipe(
                    switchMap((char) => char ?
                        of(charactersActions.loadedCharacterToCurrentList({ char, key })) :
                        this.charactersService.getById(id).pipe(
                            map((char) => {
                                this.store.dispatch(charactersActions.setItem({ char }))
                                return charactersActions.loadedCharacterToCurrentList({ char, key })
                            })
                        )
                    ))
                ),
                catchError(() => of(charactersActions.loadedCharacterToCurrentList({ char: null, key })))
            )),
        )
    )

    constructor(
        private store: Store,
        private actions$: Actions,
        private charactersService: CharactersService
    ) { }
}