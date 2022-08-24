import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IArrayDataMovie } from 'src/app/shared/interfaces/movies';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-list-page.component.html',
  styleUrls: ['./movies-list-page.component.scss']
})
export class MoviesListPageComponent {

  response$: Observable<IArrayDataMovie>;

  constructor(
    private moviesService: MoviesService
  ) {
    this.response$ = this.moviesService.getAll();
  }
}