import { Route } from '@angular/router';
import { ExercicioComponent } from './pages/exercicio/exercicio.component';
import { ExercicioService } from './services/exercicio.service';
import { ListaExerciciosComponent } from './pages/lista-exercicios/lista-exercicios.component';

export const exercicioRoutes: Route[] = [
    {
        path: ':idExercicio',
        component: ExercicioComponent
    },
    {
        path: '',
        component: ListaExerciciosComponent
    }
];
