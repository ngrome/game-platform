import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing.module';

import { RegistrationComponent } from './registration/registration.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RecoveryComponent,
    RegistrationComponent
  ]
})
export class AuthModule { }

