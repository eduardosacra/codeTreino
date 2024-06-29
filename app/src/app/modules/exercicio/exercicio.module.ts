import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercicioService } from './services/exercicio.service';
import { provideRouter } from '@angular/router';
import { exercicioRoutes } from './exercicio.routes';
import { SharedModule } from '../shared/shared.module';
import { ExercicioComponent } from './pages/exercicio/exercicio.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ExercicioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    ExercicioService,
    provideRouter(exercicioRoutes)
  ]
})
export class ExercicioModule { }
