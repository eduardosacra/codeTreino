import { Routes } from '@angular/router';

export const routes: Routes = [

    {
      path: '',
      redirectTo: 'lista-exercicios',
      pathMatch: 'full'
    },
    {
        path: 'lista-exercicios',
        loadChildren: () => import('./modules/exercicio/exercicio.module').then( m=> m.ExercicioModule)
    },
    {
      path: '**',
      redirectTo: 'lista-exercicios',
      pathMatch: 'full'
    }
];
