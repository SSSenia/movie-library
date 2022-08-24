import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap, concatMap, Observable, mergeMap, catchError, range, EMPTY } from 'rxjs';
import { ICharacter } from 'src/app/shared/interfaces/characters';
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
  loadedNeed!: number;
  loaded!: number;
  avialablePages: number[] = [];
  characters: ICharacter[] = [];
  response$!: Observable<ICharacter[]>;

  from: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private characterService: CharactersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.response$ = this.route.queryParams
      .pipe(
        concatMap((params: Params) => {
          this.currentPage = params['page'] != undefined ? params['page'] : this.currentPage;

          this.avialablePages = [];
          this.characters = [];
          this.loaded = 0;

          return this.characterService.getCount();
        }),

        switchMap((count: number) => {
          this.maxPages = Math.ceil(count / DISPLAYED_NUMBER_OF_CARDS);

          for (let i = 1; i <= this.maxPages; i++) this.avialablePages.push(i);

          if (!this.avialablePages.find(x => x == this.currentPage)) {
            this.router.navigate(['/characters'], { queryParams: { page: 1 } });
            return EMPTY;
          }
          
          let to: number = +this.currentPage * DISPLAYED_NUMBER_OF_CARDS;
          let from: number = to - (DISPLAYED_NUMBER_OF_CARDS - 1);
          this.loadedNeed = (to > count ? count : to) - from + 1;

          return range(from, this.loadedNeed);
        }),

        mergeMap((id: number): Observable<ICharacter> => {
          return this.characterService.getById(id)
            .pipe(
              catchError(() => {
                this.loaded++;
                return EMPTY;
              })
            );
        }),

        map((character: ICharacter) => {
          this.loaded++;
          this.characters.push(character);
          return this.characters.sort((a, b) => { return a.id - b.id });
        })
      );
  }
}