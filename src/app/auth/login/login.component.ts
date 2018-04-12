import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import 'rxjs/add/operator/filter';
import { Md5 } from 'ts-md5/dist/md5';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { AuthService } from '../auth.service';

@Component({
  selector: 'gplay-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  formError = {
    status: true,
    message: '',
  };
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginForm.valueChanges
      .map(value => {
        value.password = Md5.hashStr(value.password);
        console.log('Reactive Form - loginForm = ', JSON.stringify(value));
        return value;
      })
      .filter(value => this.loginForm.valid)
      .subscribe(value => {
        console.log(
          'Model Driven Form valid value: vm = ',
          JSON.stringify(value)
        );
      });
  }

  onSubmit(formData: FormGroup) {
    if (formData.valid) {
      this.spinnerService.show();
      this.authService
        .login(formData.value.username, formData.value.password)
        .subscribe(
          response => {
            console.log('User is logged in ', response);
            this.router.navigateByUrl('/logged');
            this.spinnerService.hide();
          },
          err => {
            this.formError.status = true;
            console.warn(err);
            if (err.status === 401) {
              this.formError.message = 'Username o password errate';
            }
            if (err.status === 404) {
              this.formError.message =
                'Servizio momentaneamente non raggiungibile';
            }
            this.spinnerService.hide();
          }
        );
    }
  }
}
