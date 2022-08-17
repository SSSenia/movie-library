import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CharacterComponent } from "./components/character/character.component";
import { MovieComponent } from "./components/movie/movie.component";
import { SearchPipe } from "./pipes/search.pipe";

@NgModule({
    declarations: [
        CharacterComponent,
        MovieComponent,
        SearchPipe
    ],
    exports:[
        CharacterComponent,
        MovieComponent,
        SearchPipe,
        CommonModule
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class SharedModule { }