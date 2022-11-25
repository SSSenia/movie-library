import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArrayDataCharacter, ICharacter } from '../interfaces/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<IArrayDataCharacter> {
    return this.http.get<IArrayDataCharacter>(`${environment.swapiUrl}/people/`);
  }

  public getById(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${environment.swapiUrl}/people/${id}`)
      .pipe(
        map((character: ICharacter) => {
          character.id = +character.url.split('/').slice(-2)[0];
          return character;
        })
      );
  }
}
