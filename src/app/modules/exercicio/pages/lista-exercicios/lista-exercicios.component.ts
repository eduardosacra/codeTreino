import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicioService } from '../../services/exercicio.service';
import { Observable, of } from 'rxjs';
// import { IExercicio } from 'src/app/modules/shared/interfaces/exercicio.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IExercicio } from '../../../shared/interfaces/exercicio.interface';
import { StorageService } from '../../../shared/storage.service';

@Component({
  selector: 'app-lista-exercicios',
  templateUrl: './lista-exercicios.component.html',
  styleUrl: './lista-exercicios.component.scss',
})
export class ListaExerciciosComponent implements OnInit {

  listaExercicios$: Observable<IExercicio[]>;

  constructor(
    private _exercicioService: ExercicioService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.listaExercicios$ = of([]);
  }

  ngOnInit(): void {
    this.listaExercicios$ = this._exercicioService.consultarDesafios();
    this.route.queryParamMap.subscribe(params => {
      let idCliente = params.get('id');
      this.storageService.setidCliente(idCliente);

    });
  }

  navegarParaExercicio(exercicio: IExercicio) {
    this._exercicioService.selecionarExercicio(exercicio);
    this.router.navigate([`exercicios/${exercicio.id}`]);
  }
}
