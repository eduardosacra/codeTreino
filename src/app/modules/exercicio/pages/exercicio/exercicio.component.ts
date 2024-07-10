import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicioService } from '../../services/exercicio.service';
// import { IExercicio } from 'src/app/modules/shared/interfaces/exercicio.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IExercicio } from '../../../shared/interfaces/exercicio.interface';
import { IRuntime } from '../../../shared/interfaces/runtime.interface';
import { RunCodeService } from '../../../shared/services/run-code/run-code.service';
import { Observable, of } from 'rxjs';
// import { IRuntime } from 'src/app/modules/shared/interfaces/runtime.interface';
// import { RunCodeService } from 'src/app/modules/shared/services/run-code/run-code.service';

@Component({
  selector: 'app-exercicio',
  templateUrl: './exercicio.component.html',
  styleUrl: './exercicio.component.scss',
  standalone: true,
})
export class ExercicioComponent implements OnInit {
  protected exercicio: IExercicio | undefined;
  protected resultadosRuntime: IRuntime[] = []
  protected exibeLoading = false;
  protected exibePontuacao = false;
  protected exibeException = false;
  protected exibeInstrucoes = true;
  protected exibeCodigo = false;

  protected percentualPontuacao = 0;
  protected exception: string | undefined;
  exercicioSelecionado$: Observable<IExercicio | null> = of(null);

  constructor( private _exercicioService: ExercicioService,
    private route: ActivatedRoute,
    private router: Router,
    private runCodeService: RunCodeService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this._reinicializaPagina(params);

    });

  }

  private _reinicializaPagina(params: any){
    this.exibeLoading = false;
    this.exibePontuacao = false;
    this.exibeException = false;
    this.exibeInstrucoes = true;
    this.exibeCodigo = false;
    this.percentualPontuacao = 0;
    this.exception = undefined;
    this.resultadosRuntime = [];
    // this._obterExercicio(params.idExercicio);
  }

  private _obterExercicio(idExercicio: string){
    if(idExercicio){
      this.exercicio = this._exercicioService.obterExemploPorId(Number(idExercicio))
      if(!this.exercicio)
        this.router.navigate([``]);
    }
    else {
      console.log("404");
      this.router.navigate([``]);
    }
  }

  obterResultados(resultado: IRuntime[]){
    this.resultadosRuntime = resultado;
    this.exibePontuacao = true;
  }

  obterException(exception: string){
    this.exception = exception;
    this.exibeException = true;
  }

  proximaQuestao(){
    let idExercicioAtual = this.exercicio?.id || 0;
    let idProximoExercicio = this._exercicioService.obterProximoExercicio(idExercicioAtual)?.id || 0;
    if(idProximoExercicio)
      this.router.navigate([`lista-exercicios/exercicio/${idProximoExercicio}`]);
  }

  voltarQuestao(){
    let idExercicioAtual = this.exercicio?.id || 0;
    let idExercicioAnterior = this._exercicioService.obterExercicioAnterior(idExercicioAtual)?.id || 0;;
    if(idExercicioAnterior)
      this.router.navigate([`lista-exercicios/exercicio/${idExercicioAnterior}`]);
  }

  navegaParaIntrucoes(){
    this.exibeInstrucoes = true;
    this.exibeCodigo = false;
  }

  navegaParaCodigo(){
    this.exibeInstrucoes = false;
    this.exibeCodigo = true;
  }

  runCodigo(){
    this.runCodeService.emitRunCode();
  }

}
