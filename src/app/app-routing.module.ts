import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', loadChildren: ()=>import('./movies/movies.module').then(mod => mod.MoviesModule)},
  { path: 'characters', loadChildren: ()=>import('./characters/characters.module').then(mod => mod.CharactersModule)},
  { path: '**', redirectTo: '/movies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
