import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MoviesDetailedPageComponent } from "./movies-detailed-page/movies-detailed-page.component";
import { MoviesListPageComponent } from "./movies-list-page/movies-list-page.component";

@NgModule({
    declarations: [
        MoviesDetailedPageComponent,
        MoviesListPageComponent
    ],
    exports: [
        MoviesDetailedPageComponent,
        MoviesListPageComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: MoviesListPageComponent },
            { path: ':id', component: MoviesDetailedPageComponent },
        ])
    ]
})
export class MoviesModule { }