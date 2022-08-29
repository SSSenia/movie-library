import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, range, scan } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArrayDataCharacter, ICharacter } from '../interfaces/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  parsedArray: ICharacter[] = [];
  count: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  setItem(character: ICharacter): void {
    if (!this.parsedArray.find(item => item.id == character.id)) this.parsedArray.push(character);
  }

  getAll(): Observable<ICharacter[]> {
    return range(1, this.count)
      .pipe(
        mergeMap((id: number) => {
          return this.getById(id)
        }),
        scan((acc: ICharacter[], character: ICharacter) => {
          acc.push(character);
          return acc;
        }, new Array<ICharacter>)
      );
  }

  getCount(): Observable<number> {
    if (this.count) return of(this.count);
    return this.http.get<IArrayDataCharacter>(`${environment.swapiUrl}/people/`)
      .pipe(
        map((dataCharacters: IArrayDataCharacter) => {
          this.count = dataCharacters.count;
          return dataCharacters.count;
        })
      );
  }

  getById(id: number): Observable<ICharacter> {
    let item = this.parsedArray.find(character => character.id == id)
    if (item) return of(item);
    return this.http.get<ICharacter>(`${environment.swapiUrl}/people/${id}`)
      .pipe(
        map((character: ICharacter) => {
          character.id = +character.url.split('/').slice(-2)[0];
          this.setItem(character);
          return character;
        })
      )
  }
}
