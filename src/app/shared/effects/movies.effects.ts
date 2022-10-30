import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, EMPTY, map, mergeMap, of, switchMap } from "rxjs";
import { moviesActions } from "../actions/movies.actions";
import { moviesSelector } from "../selectors/movies.selectors";
import { MoviesService } from "../services/movies.service";
import { IPoster } from "../interfaces/movies";

@Injectable()
export class MoviesEffects {

    private loadAll$ = createEffect(() => this.actions$
        .pipe(
            ofType(moviesActions.loadAll),
            concatMap(() => this.store.select(moviesSelector.getFullData)),
            switchMap((data) => data ? of(data) : this.moviesService.getAll()),
            map((fullData) => {
                for (const movie of fullData.results)
                    this.store.dispatch(moviesActions.loadPoster(movie));
                return moviesActions.loadedAll({ fullData })
            })
        )
    );

    private loadById$ = createEffect(() => this.actions$
        .pipe(
            ofType(moviesActions.loadById),
            mergeMap(({ id }) => this.store.select(moviesSelector.getById(id)).pipe(
                switchMap((data) => data ? of(data) : this.moviesService.getById(id))
            )),
            map((data) => {
                this.store.dispatch(moviesActions.loadPoster(data));
                this.store.dispatch(moviesActions.found());
                return moviesActions.loadedById(data);
            }),
            catchError(() => {
                this.store.dispatch(moviesActions.notFound());
                return EMPTY;
            })
        )
    );

    private loadPoster$ = createEffect(() => this.actions$
        .pipe(
            ofType(moviesActions.loadPoster),
            mergeMap((movie) => this.store.select(moviesSelector.getPosterByTitle(movie.title))
                .pipe(
                    switchMap((poster: IPoster | null) => poster ? of(poster) : this.moviesService.getPoster(movie.title)
                        .pipe(
                            map((url) => ({
                                imageUrl: url,
                                movieTitle: movie.title
                            }))
                        )),
                    map((poster: IPoster) => moviesActions.loadedPoster(poster))
                )
            )
        )
    );

    constructor(
        private store: Store,
        private actions$: Actions,
        private moviesService: MoviesService
    ) { }
}
