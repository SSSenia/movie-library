import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, scan } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArrayDataCharacter, ICharacter } from '../interfaces/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  dataCharacters!: IArrayDataCharacter;
  parsedArray: Array<ICharacter> = [];
  count: number = 0;
  loaded = 0;

  constructor(
    private http: HttpClient
  ) { }

  setCount(count: number): void {
    this.count = count;
  }

  setItem(item: ICharacter): void {
    if (!this.parsedArray.find(x => x.id == item.id)) this.parsedArray.push(item);
  }

  getAll(): Observable<ICharacter[]> {
    return new Observable<number>((subscriber) => { for (let i: number = 1; i <= this.count; i++) subscriber.next(i); })
      .pipe(
        mergeMap((id) => {
          return this.getById(id)
        }),
        scan((acc, character: ICharacter) => {
          acc.push(character);
          return acc;
        }, new Array<ICharacter>)
      );
  }

  getInfo(): Observable<IArrayDataCharacter> {
    if (this.dataCharacters) return new Observable<IArrayDataCharacter>(sub => { sub.next(this.dataCharacters); sub.complete() });
    return this.http.get<IArrayDataCharacter>(`${environment.swapiUrl}/people/`)
      .pipe(
        map((dataCharacters: IArrayDataCharacter) => {
          this.dataCharacters = dataCharacters;
          return dataCharacters;
        })
      );
  }

  getById(id: number): Observable<ICharacter> {
    let element = this.parsedArray.find(character => character.id == id)
    if (element) return new Observable(subscriber => subscriber.next(element));
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
