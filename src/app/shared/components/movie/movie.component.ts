import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMovie } from '../../interfaces/movies';
import { moviesSelector } from '../../selectors/movies.selectors';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input() movie!: IMovie | null;
  public poster$!: Observable<string | null>;
  
  constructor(
    private store: Store
  ) { }

  public ngOnInit(): void {
    if (this.movie) this.poster$ = this.store.select(moviesSelector.getImagePosterByTitle(this.movie.title));
  }
}
