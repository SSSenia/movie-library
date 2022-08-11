import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IArrayDataCharacter, ICharacter } from 'src/app/shared/interfaces';
import { CharactersService } from 'src/app/shared/services/characters.service';

const DISPLAYED_NUMBER_OF_CARDS = 18;

@Component({
  selector: 'app-characters-list-page',
  templateUrl: './characters-list-page.component.html',
  styleUrls: ['./characters-list-page.component.scss']
})
export class CharactersListPageComponent {

  search: string = '';
  currentPage: number = 1;
  maxPages!: number;
  count: number = DISPLAYED_NUMBER_OF_CARDS;
  loadedNeed: number = 0;
  loaded: number = 0;
  avialablePages: Array<number> = [];
  characters: ICharacter[] = [];
  searchArray: Array<ICharacter> = []

  constructor(
    private characterService: CharactersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.characterService.getInfo().subscribe((characters: IArrayDataCharacter) => {
      this.count = characters.count;
      this.characterService.setCount(this.count);
      this.maxPages = Math.ceil(this.count / DISPLAYED_NUMBER_OF_CARDS);

      for (let i = 1; i <= this.maxPages; i++)
        this.avialablePages.push(i);

      this.route.queryParams.subscribe((params: Params) => {
        this.currentPage = params['page'] != undefined ? params['page'] : this.currentPage;
        this.loadPage(+this.currentPage * DISPLAYED_NUMBER_OF_CARDS - (DISPLAYED_NUMBER_OF_CARDS - 1), +this.currentPage * DISPLAYED_NUMBER_OF_CARDS);
      });
    });
  }

  loadPage(from: number, to: number): void {
    this.loaded = 0;
    this.characters = [];

    if (to > this.count) to = this.count;
    this.loadedNeed = to - from + 1;

    if (this.loadedNeed < 1) {
      this.loadedNeed = 0;
      this.router.navigate(['/characters'], { queryParams: { page: this.maxPages } })
      return
    } else if (from < 1) {
      this.loadedNeed = 0;
      this.router.navigate(['/characters'], { queryParams: { page: 1 } })
      return
    }

    for (let i: number = from; i <= to; i++) {
      this.characterService.getById(i)
        .subscribe(
          (character) => {
            character.id = i;
            this.characters.push(character);
            this.characterService.setItem(character);
            this.loaded++;
            if (this.loadedNeed == this.loaded) {
              this.characters.sort((a, b) => { return a.id - b.id })
              this.characterService.getAll().subscribe((array: Array<ICharacter>) => this.searchArray = array);
            };
          },
          (error) => {
            this.loaded++;
            if (this.loadedNeed == this.loaded) {
              this.characters.sort((a, b) => { return a.id - b.id });
              this.characterService.getAll().subscribe((array: Array<ICharacter>) => this.searchArray = array);
            };
          }
        );
    }
  }
}
