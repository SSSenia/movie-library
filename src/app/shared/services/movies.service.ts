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

  getAll(): Observable<IArrayDataMovie> {
    return this.http.get<IArrayDataMovie>(`${environment.swapiUrl}/films/`)
    .pipe(
      map((array: IArrayDataMovie)=>{
        array.results.map(movie=>movie.poster = this.getPoster(movie.title));
        return array;
      })
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<IMovie>(`${environment.swapiUrl}/films/${id}/`)
      .pipe(
        map((movie: IMovie) => {
          movie.poster = this.getPoster(movie.title)
          return movie;
        })
      );
  }

  getPoster(title: string): Observable<string> {
    return this.http.get(`http://api.themoviedb.org/3/search/movie?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&query=Star Wars ${title}`)
      .pipe(map((x: any) => x.results[0].poster_path))
  }

}
