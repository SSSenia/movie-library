import { Component, Input } from '@angular/core';
import { IMovie } from '../../interfaces/movies';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent{

  @Input() movie!: IMovie;

  constructor() {}
}
