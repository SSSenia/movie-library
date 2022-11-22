import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { props, Store } from '@ngrx/store';
import { switchMap, Observable, map, tap } from 'rxjs';
import { charactersActions } from 'src/app/shared/actions/characters.actions';
import { ICharacter } from 'src/app/shared/interfaces/characters';
import { charactersSelector } from 'src/app/shared/selectors/characters.selectors';

const DISPLAYED_NUMBER_OF_CARDS = 18;

@Component({
  selector: 'app-characters-list-page',
  templateUrl: './characters-list-page.component.html',
  styleUrls: ['./characters-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersListPageComponent {

  public currentPage: number = 1;
  public maxPages!: number;
  public avialablePages: number[] = [];

  public response$!: Observable<boolean>;
  public search$: Observable<ICharacter[]> = this.store.select(charactersSelector.search);
  public loadedNow$: Observable<number> = this.store.select(charactersSelector.loadedNow);
  public loadedNeed$: Observable<number> = this.store.select(charactersSelector.loadedNeed);
  public list$: Observable<ICharacter[]> = this.store.select(charactersSelector.list);
  public requestChanges$: Observable<string | null>;

  public request = new FormControl('');

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.requestChanges$ = this.request.valueChanges.pipe(
      tap((value) => this.store.dispatch(charactersActions.setRequest({ request: value == null ? '' : value })))
    );
    this.store.dispatch(charactersActions.loadCount());
    this.response$ = this.route.queryParams
      .pipe(
        switchMap((params: Params) => {
          this.currentPage = params['page'] != undefined ? params['page'] : this.currentPage;

          this.avialablePages = [];
          return this.store.select(charactersSelector.count);
        }),

        map((count: number) => {
          this.maxPages = Math.ceil(count / DISPLAYED_NUMBER_OF_CARDS);

          for (let i = 1; i <= this.maxPages; i++) this.avialablePages.push(i);

          if (!this.avialablePages.find(x => x == this.currentPage)) {
            this.router.navigate(['/characters'], { queryParams: { page: 1 } });
            return false;
          }

          const to: number = +this.currentPage * DISPLAYED_NUMBER_OF_CARDS;
          const from: number = to - (DISPLAYED_NUMBER_OF_CARDS - 1);
          this.store.dispatch(charactersActions.loadCurrentRange({
            from: from,
            to: to
          }));
          return true;
        })
      );
  }
}