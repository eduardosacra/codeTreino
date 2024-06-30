import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicioService } from '../../services/exercicio.service';
import { Observable, of } from 'rxjs';
// import { IExercicio } from 'src/app/modules/shared/interfaces/exercicio.interface';
import { Router } from '@angular/router';
import { IExercicio } from '../../../shared/interfaces/exercicio.interface';

@Component({
  selector: 'app-lista-exercicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-exercicios.component.html',
  styleUrl: './lista-exercicios.component.scss',
})
export class ListaExerciciosComponent implements OnInit {

  listaExercicios$: Observable<IExercicio[]>;

  constructor(
    private _exercicioService: ExercicioService,
    private router: Router
  ) {
    this.listaExercicios$ = of([]);
  }

  ngOnInit(): void {
    this.listaExercicios$ = this._exercicioService.consultarDesafios();
  }

  navegarParaExercicio(exercicio: IExercicio) {
    this.router.navigate([`/exercicio/${exercicio.id}`]);
  }
}
