import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, EMPTY, from, map, mergeMap, of, switchMap } from "rxjs";
import { moviesActions } from "../actions/movies.actions";
import { moviesSelector } from "../selectors/movies.selectors";
import { MoviesService } from "../services/movies.service";

@Injectable()
export class MoviesEffects {

    private loadAll$ = createEffect(() => this.actions$
        .pipe(
            ofType(moviesActions.loadAll),
            concatMap(() => this.store.select(moviesSelector.getIsAllLoaded)),
            switchMap((isAllLoaded) => {
                if (isAllLoaded) return EMPTY
                return this.moviesService.getAll()
            }),
            switchMap((fullData) => {
                this.store.dispatch(moviesActions.loadedAll())
                return from(fullData.results)
            }),
            mergeMap((movie) => this.moviesService.getPoster(movie.title).pipe(
                map((poster) => moviesActions.loadedById({
                    ...movie,
                    poster: poster
                }))
            ))
        )
    );

    private loadById$ = createEffect(() => this.actions$
        .pipe(
            ofType(moviesActions.loadById),
            mergeMap(({ id }) => this.store.select(moviesSelector.getById(id))
                .pipe(
                    switchMap((data) => {
                        if (data) return EMPTY;
                        return this.moviesService.getById(id);
                    })
                )),
            switchMap((movie) => this.moviesService.getPoster(movie.title)
                .pipe(
                    map((poster) => {
                        return moviesActions.loadedById({
                            ...movie,
                            poster: poster
                        })
                    })
                )),
            catchError(() => {
                this.store.dispatch(moviesActions.notFound());
                return EMPTY;
            })
        )
    );

    private loadListByArray$ = createEffect(() => this.actions$
        .pipe(
            ofType(moviesActions.loadCurrentListFromArray),
            concatMap(({ request }) => from(request.map(x => +x.split('/').slice(-2)[0]))),
            mergeMap((id) => this.store.select(moviesSelector.getById(id))),
            map((movie) => moviesActions.loadedCharacterToCurrentList({ movie })),
            catchError(() => of(moviesActions.loadedCharacterToCurrentList({ movie: null })))
        )
    )

    constructor(
        private store: Store,
        private actions$: Actions,
        private moviesService: MoviesService
    ) { }
}
