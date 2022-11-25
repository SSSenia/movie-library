import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArrayDataMovie, IMovie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<IArrayDataMovie> {
    return this.http.get<IArrayDataMovie>(`${environment.swapiUrl}/films/`)
      .pipe(
        map((array: IArrayDataMovie) => {
          array.results.map(movie => movie.poster$ = this.getPoster(movie.title));
          return array;
        })
      );
  }

  public getById(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(`${environment.swapiUrl}/films/${id}/`);
  }

  public getPoster(title: string): Observable<string> {
    return this.http.get(`http://api.themoviedb.org/3/search/movie?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&query=Star Wars ${title}`)
      .pipe(map((search: any) => search.results[0].poster_path));
  }
}
