import { Component } from '@angular/core';
import { IArrayDataMovie, IMovie } from 'src/app/shared/interfaces';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-list-page.component.html',
  styleUrls: ['./movies-list-page.component.scss']
})
export class MoviesListPageComponent {

  movies: Array<IMovie> = [];
  loadedList = false;
  loadedPoster = 0;

  constructor(
    private moviesService: MoviesService
  ) {
    this.moviesService.getAll().subscribe((movies: IArrayDataMovie) => {
      this.movies = movies.results;
      this.loadedList = true;

      for (let i = 0; i < this.movies.length; i++) {
        moviesService.getPoster(this.movies[i].title).subscribe((search) => {
          this.movies[i].results = search.results;
          this.loadedPoster++;
        });
      }
    });
  }
}