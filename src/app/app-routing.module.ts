import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedComponent } from './core/logged/logged.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthComponent } from './core/auth/auth.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

const routeParams = {
  enableTracing: false, // <-- debugging purposes only)
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routeParams)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
