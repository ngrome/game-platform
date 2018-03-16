import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
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
