import { Route } from '@angular/router';
import { ExercicioComponent } from './pages/exercicio/exercicio.component';
import { ExercicioService } from './services/exercicio.service';
import { ListaExerciciosComponent } from './pages/lista-exercicios/lista-exercicios.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

export const exercicioRoutes: Route[] = [
    {
      path: ':id',
      component: PaginaInicialComponent
    },
    {
      path: '',
      component: PaginaInicialComponent
    }

];
