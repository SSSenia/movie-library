import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, map, mergeMap, of, switchMap } from "rxjs";
import { othersActions } from "../actions/others.actions";
import { othersSelector } from "../selectors/others.selectors";
import { OthersService } from "../services/others.service";

@Injectable()
export class OthersEffects {

    private loadByUrl$ = createEffect(() => this.actions$
        .pipe(
            ofType(othersActions.loadPlanetByAdress),
            mergeMap(({ url }) => this.store.select(othersSelector.getPlanetByUrl(url)).pipe(
                switchMap((data) => data ? of(data) : this.othersService.getPlanetByAdress(url))
            )),
            map((data) => othersActions.loadedPlanetByAdress(data)),
            catchError(() => EMPTY)
        )
    );

    constructor(
        private store: Store,
        private actions$: Actions,
        private othersService: OthersService
    ) { }
}