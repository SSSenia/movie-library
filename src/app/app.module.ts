import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListPageComponent } from './movies/movies-list-page/movies-list-page.component';
import { MoviesDetailedPageComponent } from './movies/movies-detailed-page/movies-detailed-page.component';
import { CharactersDetailedPageComponent } from './characters/characters-detailed-page/characters-detailed-page.component';
import { CharactersListPageComponent } from './characters/characters-list-page/characters-list-page.component';
import { CharacterComponent } from './shared/components/character/character.component';
import { MovieComponent } from './shared/components/movie/movie.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MoviesListPageComponent,
    MoviesDetailedPageComponent,
    CharactersDetailedPageComponent,
    CharactersListPageComponent,
    CharacterComponent,
    MovieComponent,
    SearchPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
