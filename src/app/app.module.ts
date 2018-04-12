import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './shared/guards/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './core/auth/auth.module';
import { LoggedModule } from './core/logged/logged.module';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    LoggedModule,
    AppRoutingModule,
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
