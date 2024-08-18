import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunCodeService {
  private runCodeSubject = new Subject();
  private cleanRunCodeSubject = new Subject();
  runCodeObs = this.runCodeSubject.asObservable();
  cleanRunCodeObs = this.cleanRunCodeSubject.asObservable();
  constructor() { }

  emitRunCode(){
    this.runCodeSubject.next(undefined);
  }
  limparRunCode(){
    this.cleanRunCodeSubject.next(undefined);
  }
}
