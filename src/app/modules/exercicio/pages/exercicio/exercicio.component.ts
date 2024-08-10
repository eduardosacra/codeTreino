import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicioService } from '../../services/exercicio.service';
// import { IExercicio } from 'src/app/modules/shared/interfaces/exercicio.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IExercicio } from '../../../shared/interfaces/exercicio.interface';
import { IRuntime } from '../../../shared/interfaces/runtime.interface';
import { RunCodeService } from '../../../shared/services/run-code/run-code.service';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { StorageService } from '../../../shared/storage.service';
// import { IRuntime } from 'src/app/modules/shared/interfaces/runtime.interface';
// import { RunCodeService } from 'src/app/modules/shared/services/run-code/run-code.service';

@Component({
  selector: 'app-exercicio',
  templateUrl: './exercicio.component.html',
  styleUrl: './exercicio.component.scss'
})
export class ExercicioComponent implements OnInit, OnDestroy {
  protected exercicio: IExercicio | null = null;
  protected resultadosRuntime: IRuntime[] = []
  protected exibeLoading = false;
  protected exibePontuacao = false;
  protected exibeException = false;
  protected exibeInstrucoes = true;
  protected exibeCodigo = false;

  protected percentualPontuacao = 0;
  protected exception: string | undefined;
  protected subScriptionExSelcionado: any = null;
  private registroSubscription: Subscription | undefined;
  private exerciciosSubscription: Subscription | undefined;

  constructor( private exercicioService: ExercicioService,
    private route: ActivatedRoute,
    private router: Router,
    private runCodeService: RunCodeService,
    private storageService: StorageService
  ){}
  ngOnDestroy(): void {
    if(this.subScriptionExSelcionado) this.subScriptionExSelcionado.unsubscribe();
    if(this.registroSubscription) this.registroSubscription.unsubscribe();
    if(this.exerciciosSubscription) this.exerciciosSubscription.unsubscribe();
  }

  ngOnInit(): void {

   this.subScriptionExSelcionado = combineLatest([this.exercicioService.obterExercicioSelecionado(), this.route.paramMap])
    .subscribe(([exercicio, parametros]) => {

      // Se não houver exercício, busca o exercício pelo id.
      if(!exercicio) {
        let idExercicio = Number(parametros.get('idExercicio'));

        this.exerciciosSubscription = this.exercicioService.consultarDesafios().subscribe((exercicios) => {
          let exLocalizado =  exercicios.find((ex) => ex.id === idExercicio);

          if(exLocalizado) this.exercicioService.selecionarExercicio(exLocalizado);

        });
      }

      this.exercicio = exercicio;
      this._reinicializaPagina();
    });

  }

  private _reinicializaPagina(){
    this.exibeLoading = false;
    this.exibePontuacao = false;
    this.exibeException = false;
    this.exibeInstrucoes = true;
    this.exibeCodigo = false;
    this.percentualPontuacao = 0;
    this.exception = undefined;
    this.resultadosRuntime = [];
  }

  obterResultados(resultado: IRuntime[]){
    this.resultadosRuntime = resultado;
    this.exibePontuacao = true;
    this.registrarResultado(true);
  }

  obterException(exception: string){
    this.exception = exception;
    this.exibeException = true;
    this.registrarResultado(false);
  }

  registrarResultado(sucesso: boolean) {
    let idCliente = this.storageService.getIdCliente();

    if(this.exercicio?.id)
    this.registroSubscription = this.exercicioService.registrarResultado(idCliente, this.exercicio?.id ?? 0, sucesso)
    .subscribe((result) => {
      console.log('Resultado registrado com sucesso');
    }, (error) => { console.log('Erro ao registrar resultado', error) });

  }

  proximaQuestao(){
    let idExercicioAtual = this.exercicio?.id || 0;
    let proximoExercicio = this.exercicioService.obterProximoExercicio(idExercicioAtual);
    this.router.navigate([`exercicios/${proximoExercicio?.id ?? ''}`]);
  }

  voltarQuestao(){
    let idExercicioAtual = this.exercicio?.id || 0;
    let proximoExercicio = this.exercicioService.obterExercicioAnterior(idExercicioAtual);
    this.router.navigate([`exercicios/${proximoExercicio?.id ?? ''}`]);
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
    this.resultadosRuntime = [];
    this.exibeException = false;
    this.exception = "";
    this.runCodeService.emitRunCode();
  }

}
