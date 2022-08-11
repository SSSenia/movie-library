import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ICharacter, IMovie } from 'src/app/shared/interfaces';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { OthersService } from 'src/app/shared/services/others.service';

@Component({
  selector: 'app-movies-detailed-page',
  templateUrl: './movies-detailed-page.component.html',
  styleUrls: ['./movies-detailed-page.component.scss']
})
export class MoviesDetailedPageComponent {

  movie!: IMovie;
  characters: Array<ICharacter> = [];
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private othersService: OthersService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.moviesService.getById(params['id']).subscribe((movie: IMovie) => {
        this.movie = movie;

        moviesService.getPoster(this.movie.title!).subscribe((search) => {
          this.movie.results = search.results;
        });

        for (let character of this.movie.characters!) {
          this.othersService.getCharacterByAdress(character).subscribe((character: ICharacter) => {
            this.characters.push(character);
          });
        }
      },
      (error)=>{
        this.error = true;
      });
    });
  }
}
