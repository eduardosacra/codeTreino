import { Route } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const pageNotFoundRoutes: Route[] = [
    {
      path: '',
      component: PageNotFoundComponent
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }

];
