import { Route } from '@angular/router';
import { ExercicioComponent } from './pages/exercicio/exercicio.component';
import { ExercicioService } from './services/exercicio.service';
import { ListaExerciciosComponent } from './pages/lista-exercicios/lista-exercicios.component';

export const exercicioRoutes: Route[] = [
    {
      path: '',
      component: ListaExerciciosComponent
    },
    {
      path: 'exercicio/:idExercicio',
      component: ExercicioComponent
    }

];
