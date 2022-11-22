import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable, catchError, EMPTY, map, switchMap } from 'rxjs';
import { charactersActions } from 'src/app/shared/actions/characters.actions';
import { moviesActions } from 'src/app/shared/actions/movies.actions';
import { ICharacter } from 'src/app/shared/interfaces/characters';
import { IMovie } from 'src/app/shared/interfaces/movies';
import { charactersSelector } from 'src/app/shared/selectors/characters.selectors';
import { moviesSelector } from 'src/app/shared/selectors/movies.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies-detailed-page',
  templateUrl: './movies-detailed-page.component.html',
  styleUrls: ['./movies-detailed-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesDetailedPageComponent implements OnInit {

  public movie!: IMovie;
  public imagesUrl: string = environment.imagesUrl;
  public characters: Observable<ICharacter | null>[] = [];

  public response$!: Observable<boolean>;
  public isFound$: Observable<boolean> = this.store.select(moviesSelector.getIsFound);
  public poster$!: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(moviesActions.loadById({ id: this.route.snapshot.params['id'] }));
    this.response$ = this.store.select(moviesSelector.getById(this.route.snapshot.params['id'])).pipe(

      switchMap((movie: IMovie | null) => {
        if (!movie) return EMPTY;
        this.movie = movie;
        this.poster$ = this.store.select(moviesSelector.getImagePosterByTitle(movie.title));
        this.characters = [];
        return from(this.movie.characters)
      }),

      map((character: string) => {
        const id = +character.split('/').slice(-2)[0];
        this.store.dispatch(charactersActions.loadById({ id }))
        this.characters.push(this.store.select(charactersSelector.getById(id)));
        return true;
      }),

      catchError(() => EMPTY)
    );
  }
}
