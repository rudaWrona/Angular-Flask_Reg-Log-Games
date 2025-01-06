import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'logowanie',
    loadChildren: () => import('./logowanie/logowanie.module').then( m => m.LogowaniePageModule)
  },
  {
    path: 'rejestracja',
    loadChildren: () => import('./rejestracja/rejestracja.module').then( m => m.RejestracjaPageModule)
  },
  {
    path: 'gry',
    loadChildren: () => import('./gry/gry.module').then( m => m.GryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
