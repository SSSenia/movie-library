import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArrayDataCharacter, ICharacter } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

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
    if (!this.parsedArray.find(x => x.id == item.id))
      this.parsedArray.push(item);

  }

  getAll(): Observable<ICharacter[]> {
    return new Observable((subscriber) => {
      for (let i: number = 1; i <= this.count; i++) {
        if (!this.parsedArray.find(x => x.id == i))
          this.getById(i)
            .subscribe(
              (character) => {
                character.id = i;
                this.parsedArray.push(character);
                this.loaded++;
                subscriber.next(this.parsedArray)
              },
              (error) => {
                this.loaded++;
                subscriber.next(this.parsedArray)
              }
            );
        else {
          this.loaded++;
          subscriber.next(this.parsedArray)
        }
      }
    })
  }

  getInfo(): Observable<IArrayDataCharacter> {
    return this.http.get<IArrayDataCharacter>('https://swapi.dev/api/people/');
  }

  getById(id: number): Observable<ICharacter> {
    let element = this.parsedArray.find(x => x.id == id)
    if (element) return new Observable(subscriber => subscriber.next(element));
    else return this.http.get<ICharacter>(`https://swapi.dev/api/people/${id}/`);
  }
}
