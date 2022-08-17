import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ICharacter } from 'src/app/shared/interfaces/characters';
import { IMovie } from 'src/app/shared/interfaces/movies';
import { IPlanet } from 'src/app/shared/interfaces/others';
import { CharactersService } from 'src/app/shared/services/characters.service';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { OthersService } from 'src/app/shared/services/others.service';

@Component({
  selector: 'app-characters-detailed-page',
  templateUrl: './characters-detailed-page.component.html',
  styleUrls: ['./characters-detailed-page.component.scss']
})
export class CharactersDetailedPageComponent {

  movies: Array<IMovie> = [];
  character!: ICharacter;
  planet!: IPlanet;
  loadedFilms: number  = 0;
  loadedPlanet: boolean = false;
  errorCatch: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private othersService: OthersService,
    private moviesService: MoviesService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.charactersService.getById(params['id']).subscribe((character: ICharacter) => {
        this.character = character;

        this.othersService.getPlanetByAdress(this.character.homeworld).subscribe((planet: IPlanet) => {
          this.planet = planet;
          this.loadedPlanet = true;
        });

        for (let i of this.character.films) {
          othersService.getMovieByAdress(i).subscribe((movie: IMovie) => {
            this.loadedFilms++;
            this.movies.push(movie);

            if (this.loadedFilms == this.character.films.length)
              for (let i = 0; i < this.movies.length; i++) {
                moviesService.getPoster(this.movies[i].title).subscribe((search) => {
                  this.movies[i].results = search.results;
                  this.loadedFilms++;
                });
              }
          });
        }
      },
      (error)=>{
        this.errorCatch = true;
      });
    });
  }
}
