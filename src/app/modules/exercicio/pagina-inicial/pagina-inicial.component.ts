import { Component, OnInit } from '@angular/core';
import { ExercicioService } from '../services/exercicio.service';
import { ListaExerciciosComponent } from '../pages/lista-exercicios/lista-exercicios.component';
import { ExercicioComponent } from '../pages/exercicio/exercicio.component';
import { Observable, of } from 'rxjs';
import { IExercicio } from '../../shared/interfaces/exercicio.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent implements OnInit {

  constructor(private exercicioService: ExercicioService, private route: ActivatedRoute) {

  }

  exibirListaExercicios: boolean = true;
  exercicioSelecionado$: Observable<IExercicio | null> = of(null);

  ngOnInit(): void {
    this.exercicioSelecionado$ = this.exercicioService.obterExercicioSelecionado();
    debugger;
    this.route.paramMap.subscribe(params => {
      debugger;
      let token = params.get('token');
      alert(`Token ${token}`);
    });
  }

}
