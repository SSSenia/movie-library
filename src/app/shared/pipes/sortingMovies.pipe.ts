import { Pipe, PipeTransform } from "@angular/core";
import { IMovie } from "../interfaces/movies";

@Pipe({
    name: 'sortingMovies'
})
export class SortingMoviesPipe implements PipeTransform {
    public transform(characters: IMovie[]): IMovie[] {
        return characters.slice().sort((a, b) => +a.url.split('/').slice(-2)[0] - +b.url.split('/').slice(-2)[0]);
    }
}