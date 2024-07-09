import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/exercicio/exercicio.module').then( m=> m.ExercicioModule)
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }
];
