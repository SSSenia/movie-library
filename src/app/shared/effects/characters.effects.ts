import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, EMPTY, map, mergeMap, of, range, switchMap, tap } from "rxjs";
import { charactersActions } from "../actions/characters.actions";
import { IArrayDataCharacter, ICharacter } from "../interfaces/characters";
import { charactersSelector } from "../selectors/characters.selectors";
import { CharactersService } from "../services/characters.service";

@Injectable()
export class CharactersEffects {

    private loadCount$ = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadCount),
            concatMap(() => this.charactersService.getAll()
                .pipe(
                    map((data: IArrayDataCharacter) => {
                        for (const character of data.results)
                            this.store.dispatch(charactersActions.setItem({ character }));
                        return charactersActions.loadedCount({ count: data.count })
                    }),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    private loadById$ = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadById),
            mergeMap((value) => this.store.select(charactersSelector.getById(value.id)).pipe(
                switchMap((character: ICharacter | null) => character ? of(character) : this.charactersService.getById(value.id))
            )),
            map((character) => {
                this.store.dispatch(charactersActions.found());
                return charactersActions.setItem({ character });
            }),
            catchError(() => {
                this.store.dispatch(charactersActions.notFound());
                return EMPTY;
            })
        )
    );

    private loadList$ = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadCurrentRange),
            switchMap((range) => this.store.select(charactersSelector.count)
                .pipe(map((count) => ({ range, count })))
            ),
            switchMap((value) =>
                range(
                    value.range.from,
                    (value.range.to > value.count ? value.count : value.range.to) - value.range.from + 1)
            ),
            mergeMap((id: number) => this.store.select(charactersSelector.getById(id))
                .pipe(switchMap((character) => character ? of(character) : this.charactersService.getById(id)
                    .pipe(
                        tap((character) => this.store.dispatch(charactersActions.setItem({ character })))
                    )
                ),
                    map((char: ICharacter | null) => charactersActions.loadedCurrentRange({ char })),
                    catchError(() => of(charactersActions.loadedCurrentRange({ char: null })))
                )
            )
        )
    );

    constructor(
        private store: Store,
        private actions$: Actions,
        private charactersService: CharactersService
    ) { }
}