import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pageNotFoundRoutes } from './page-not-found.routes';
import { provideRouter } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideRouter(pageNotFoundRoutes)
  ]
})
export class PageNotFoundModule { }
