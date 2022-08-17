import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArrayDataMovie, IMovie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IArrayDataMovie>{
    return this.http.get<IArrayDataMovie>(`${environment.swapiUrl}/films/`);
  }

  getById(id: number): Observable<IMovie>{
    return this.http.get<IMovie>(`${environment.swapiUrl}/films/${id}/`);
  }

  getPoster(title: string): Observable<any>{
    return this.http.get(`http://api.themoviedb.org/3/search/movie?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&query=Star Wars ${title}`)
  }

}
