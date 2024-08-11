import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'exercicios',
        loadChildren: () => import('./modules/exercicio/exercicio.module').then( m=> m.ExercicioModule)
    },
    {
      path: '',
      redirectTo: 'exercicios',
      pathMatch: 'full'
    },
    {
      path: '**',
      loadChildren: () => import('./modules/page-not-found/page-not-found.module').then( m=> m.PageNotFoundModule)
    }

];
