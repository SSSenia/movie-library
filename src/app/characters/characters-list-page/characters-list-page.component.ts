import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap, concatMap, Observable, mergeMap, catchError } from 'rxjs';
import { IArrayDataCharacter, ICharacter } from 'src/app/shared/interfaces/characters';
import { CharactersService } from 'src/app/shared/services/characters.service';

const DISPLAYED_NUMBER_OF_CARDS = 18;

@Component({
  selector: 'app-characters-list-page',
  templateUrl: './characters-list-page.component.html',
  styleUrls: ['./characters-list-page.component.scss']
})
export class CharactersListPageComponent {

  currentPage: number = 1;
  maxPages!: number;
  count: number = DISPLAYED_NUMBER_OF_CARDS;
  loadedNeed: number = 1;
  loaded: number = 0;
  avialablePages: number[] = [];
  characters: ICharacter[] = [];
  searchArray: ICharacter[] = [];
  response$!: Observable<any>;
  search$!: Observable<any>;
  from: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private characterService: CharactersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.from.value.search.value
    this.response$ = this.route.queryParams
      .pipe(
        concatMap((params: Params) => {
          this.currentPage = params['page'] != undefined ? params['page'] : this.currentPage;

          this.avialablePages = [];
          this.characters = [];
          this.searchArray = [];
          this.loadedNeed = 1;
          this.loaded = 0;
          return this.characterService.getInfo();
        }),
        switchMap((characters: IArrayDataCharacter) => {
          this.count = characters.count;
          this.characterService.setCount(this.count);
          this.maxPages = Math.ceil(this.count / DISPLAYED_NUMBER_OF_CARDS);

          for (let i = 1; i <= this.maxPages; i++)
            this.avialablePages.push(i);
          let to = +this.currentPage * DISPLAYED_NUMBER_OF_CARDS;
          let from = to - (DISPLAYED_NUMBER_OF_CARDS - 1);
          this.characters = [];
          if (to > this.count) to = this.count;
          this.loadedNeed = to - from + 1;

          if (this.loadedNeed < 1) {
            this.loadedNeed = 1;
            this.router.navigate(['/characters'], { queryParams: { page: this.maxPages } })
          } else if (from < 1) {
            this.loadedNeed = 1;
            this.router.navigate(['/characters'], { queryParams: { page: 1 } })
          }
          return new Observable<number>((sub) => { for (let i: number = from; i <= to; i++) sub.next(i); });
        }),

        mergeMap((id: any): Observable<ICharacter> => {
          return this.characterService.getById(id)
            .pipe(
              catchError(() => {
                return new Observable<any>((sub) => {
                  this.loaded++;
                  sub.complete;
                });
              })
            );
        }),

        map((character: ICharacter) => {
          this.loaded++;
          this.characters.push(character);
          this.characterService.setItem(character);
          return this.characters.sort((a, b) => { return a.id - b.id });
        })
      );
  }

}