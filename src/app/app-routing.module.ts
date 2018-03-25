import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedComponent } from './logged/logged.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'logged',
    component: LoggedComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];

const routeParams = {
  enableTracing: true, // <-- debugging purposes only)
};
@NgModule({
  imports: [
    RouterModule.forRoot(routes, routeParams)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
