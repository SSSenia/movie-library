import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArrayDataMovie, IMovie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  dataMovies!: IArrayDataMovie;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IArrayDataMovie> {
    if (this.dataMovies) return new Observable(sub => sub.next(this.dataMovies));
    return this.http.get<IArrayDataMovie>(`${environment.swapiUrl}/films/`)
      .pipe(
        map((array: IArrayDataMovie) => {
          this.dataMovies = array;
          array.results.map(movie => movie.posterObservable = this.getPosterObservable(movie.title));
          return array;
        })
      );
  }

  getById(id: number): Observable<IMovie> {
    if (this.dataMovies) return new Observable(sub => sub.next(this.dataMovies.results.find(movie => +movie.url.split('/').slice(-2)[0] == id)));
    return this.http.get<IMovie>(`${environment.swapiUrl}/films/${id}/`)
      .pipe(
        map((movie: IMovie) => {
          movie.posterObservable = this.getPosterObservable(movie.title)
          return movie;
        })
      );
  }

  getPosterObservable(title: string): Observable<string> {
    if (this.dataMovies) {
      let localPoster = this.dataMovies.results.find(x => x.title == title)!.poster;
      if (localPoster) return new Observable(sub => sub.next(localPoster));
    }
    return this.http.get(`http://api.themoviedb.org/3/search/movie?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&query=Star Wars ${title}`)
      .pipe(
        map((search: any) => {
          if (this.dataMovies) this.dataMovies.results.find(x => x.title == title)!.poster = search.results[0].poster_path;
          return search.results[0].poster_path;
        })
      )
  }

}
