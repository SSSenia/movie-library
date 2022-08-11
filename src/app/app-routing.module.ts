import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CharactersDetailedPageComponent } from './characters/characters-detailed-page/characters-detailed-page.component';
import { CharactersListPageComponent } from './characters/characters-list-page/characters-list-page.component';
import { MoviesDetailedPageComponent } from './movies/movies-detailed-page/movies-detailed-page.component';
import { MoviesListPageComponent } from './movies/movies-list-page/movies-list-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesListPageComponent },
  { path: 'characters', component: CharactersListPageComponent },
  { path: 'movie/:id', component: MoviesDetailedPageComponent },
  { path: 'character/:id', component: CharactersDetailedPageComponent },
  { path: '**', redirectTo: '/movies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
