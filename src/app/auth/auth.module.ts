import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';

import { AuthRoutingModule } from './auth.routing.module';

import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RecoveryComponent,
    RegistrationComponent,
  ],
  providers: [AuthService],
})
export class AuthModule {}
