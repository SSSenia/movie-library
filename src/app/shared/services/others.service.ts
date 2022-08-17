import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPlanet, IStarship } from "../interfaces/others";
import { ICharacter } from "../interfaces/characters";
import { IMovie } from "../interfaces/movies";

@Injectable({
  providedIn: 'root'
})
export class OthersService {

  constructor(
    private http: HttpClient
  ) { }

  getPlanetByAdress(adress: string): Observable<IPlanet> {
    return this.http.get<IPlanet>(adress);
  }
  getStarshipByAdress(adress: string): Observable<IStarship> {
    return this.http.get<IStarship>(adress);
  }
  getMovieByAdress(adress: string): Observable<IMovie> {
    return this.http.get<IMovie>(adress);
  }
  getCharacterByAdress(adress: string): Observable<ICharacter> {
    return this.http.get<ICharacter>(adress);
  }
}