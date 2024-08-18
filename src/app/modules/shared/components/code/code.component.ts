import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, WritableSignal, signal } from '@angular/core';
import { EditorView , minimalSetup, basicSetup} from 'codemirror';
import { javascript } from "@codemirror/lang-javascript"
import { IExercicio } from '../../interfaces/exercicio.interface';
import { IRuntime } from '../../interfaces/runtime.interface';
import { RunCodeService } from '../../services/run-code/run-code.service';
import { Subscription } from 'rxjs';
import { EditorState } from '@codemirror/state';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss',
})
export class CodeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editor') editorCodigo!: ElementRef;
  private editorViewCodeMirror: EditorView | null = null;

  @Input() exercicio: IExercicio | null = null;
  @Output() resultados = new EventEmitter<IRuntime[]>();
  @Output() exception = new EventEmitter<string>();

  private runCondeSubscription: Subscription;
  private cleanRunCodeSubscription: Subscription;

  constructor(private runCodeService: RunCodeService){
    this.runCondeSubscription = runCodeService.runCodeObs.subscribe( ()=>{
      this.runCodigo();
    })
    this.cleanRunCodeSubscription = runCodeService.cleanRunCodeObs.subscribe( ()=>{
      if (this.editorViewCodeMirror) {
        this.editorViewCodeMirror.dispatch({
          changes: { from: 0, to: this.editorViewCodeMirror.state.doc.length, insert: '' }
        });
      }

    });
  }

  ngOnDestroy(): void {
    if(this.runCondeSubscription) this.runCondeSubscription.unsubscribe();
    if(this.cleanRunCodeSubscription) this.cleanRunCodeSubscription.unsubscribe();
  }


  ngAfterViewInit(): void {
    this._buildarCodeMirror();
  }

  private _buildarCodeMirror(){
    this.editorViewCodeMirror = new EditorView({
      extensions: [basicSetup, javascript() ],
      parent: this.editorCodigo.nativeElement,
    });
  }

  runCodigo(){
    const content: string | undefined = this.editorViewCodeMirror?.state?.doc?.toString();
    let runTime: IRuntime[] = []
    if(content && this.exercicio){
      let exception: string | undefined;
      const nomeFuncao = this.exercicio.nomeFuncao;
      for(const exemplo of this.exercicio.exemplos){
        const runner = content + nomeFuncao + exemplo.entrada;
        try {
          const resultado =  eval(runner);
          runTime.push({
            run: nomeFuncao+exemplo.entrada,
            resultado: resultado,
            sucesso: resultado ? resultado.toString() == exemplo.saida : resultado == exemplo.saida
          })
        } catch (error) {
          exception = error?.toString();
          break;
        }
      }

      if(exception) this.exception.emit(exception);
      else this.resultados.emit(runTime);

    }

  }

}
