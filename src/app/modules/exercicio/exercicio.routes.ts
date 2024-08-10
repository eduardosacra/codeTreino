import { Route } from '@angular/router';
import { ExercicioComponent } from './pages/exercicio/exercicio.component';
import { ExercicioService } from './services/exercicio.service';
import { ListaExerciciosComponent } from './pages/lista-exercicios/lista-exercicios.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

export const exercicioRoutes: Route[] = [
    {
      path: 'exercicios/:idExercicio',
      component: ExercicioComponent
    },
    {
      path: 'listaexercicios/:id',
      component: ListaExerciciosComponent
    },
    {
      path: 'listaexercicios',
      component: ListaExerciciosComponent
    },
    {
      path: '',
      redirectTo: 'listaexercicios',
      pathMatch: 'full'
    }

];
