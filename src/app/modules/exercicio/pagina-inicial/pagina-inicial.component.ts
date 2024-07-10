import { Component, OnInit } from '@angular/core';
import { ExercicioService } from '../services/exercicio.service';
import { ListaExerciciosComponent } from '../pages/lista-exercicios/lista-exercicios.component';
import { ExercicioComponent } from '../pages/exercicio/exercicio.component';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [ListaExerciciosComponent, ExercicioComponent],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent implements OnInit {

  constructor(private exercicioService: ExercicioService) { }

  exibirListaExercicios: boolean = true;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
