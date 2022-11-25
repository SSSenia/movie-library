import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CharacterComponent } from "./components/character/character.component";
import { MovieComponent } from "./components/movie/movie.component";
import { ParseIdFromUrlPipe } from "./pipes/parse-id-from-url.pipe";
import { SortingCharactersPipe } from "./pipes/sortingCharacters.pipe";
import { SortingMoviesPipe } from "./pipes/sortingMovies.pipe";

@NgModule({
    declarations: [
        CharacterComponent,
        MovieComponent,
        ParseIdFromUrlPipe,
        SortingCharactersPipe,
        SortingMoviesPipe
    ],
    exports: [
        CharacterComponent,
        MovieComponent,
        ParseIdFromUrlPipe,
        SortingCharactersPipe,
        SortingMoviesPipe,
        CommonModule
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class SharedModule { }