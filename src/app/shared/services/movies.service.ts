import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArrayDataMovie, IMovie } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IArrayDataMovie>{
    return this.http.get<IArrayDataMovie>('https://swapi.dev/api/films/');
  }

  getById(id: number): Observable<IMovie>{
    return this.http.get<IMovie>(`https://swapi.dev/api/films/${id}/`);
  }

  getPoster(title: string): Observable<any>{
    return this.http.get(`http://api.themoviedb.org/3/search/movie?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&query=Star Wars ${title}`)
  }

}
