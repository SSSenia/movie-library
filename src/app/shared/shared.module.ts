import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CharacterComponent } from "./components/character/character.component";
import { MovieComponent } from "./components/movie/movie.component";
import { ParseIdFromUrlPipe } from "./pipes/parse-id-from-url.pipe";
import { SortingPipe } from "./pipes/sorting.pipe";

@NgModule({
    declarations: [
        CharacterComponent,
        MovieComponent,
        ParseIdFromUrlPipe,
        SortingPipe
    ],
    exports: [
        CharacterComponent,
        MovieComponent,
        ParseIdFromUrlPipe,
        SortingPipe,
        CommonModule
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class SharedModule { }