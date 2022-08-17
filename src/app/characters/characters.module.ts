import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CharactersDetailedPageComponent } from "./characters-detailed-page/characters-detailed-page.component";
import { CharactersListPageComponent } from "./characters-list-page/characters-list-page.component";

@NgModule({
    declarations: [
        CharactersDetailedPageComponent,
        CharactersListPageComponent
    ],
    exports: [
        CharactersDetailedPageComponent,
        CharactersListPageComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: CharactersListPageComponent },
            { path: ':id', component: CharactersDetailedPageComponent },
        ])
    ]
})
export class CharactersModule { }