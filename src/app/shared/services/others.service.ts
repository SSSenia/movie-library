import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPlanet, IStarship } from "../interfaces/others";
import { ICharacter } from "../interfaces/characters";
import { IMovie } from "../interfaces/movies";
import { CharactersService } from "./characters.service";

@Injectable({
  providedIn: 'root'
})
export class OthersService {

  constructor(
    private http: HttpClient,
    private charactersService: CharactersService
  ) { }

  public getPlanetByAdress(url: string): Observable<IPlanet> {
    return this.http.get<IPlanet>(url);
  }

  public getStarshipByAdress(url: string): Observable<IStarship> {
    return this.http.get<IStarship>(url);
  }

  public getMovieByAdress(url: string): Observable<IMovie> {
    return this.http.get<IMovie>(url);
  }

  public getCharacterByAdress(url: string): Observable<ICharacter> {
    return this.charactersService.getById(+url.split('/').slice(-2)[0]);
  }
}