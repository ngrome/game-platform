import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators} from '@angular/forms';

import { Md5 } from 'ts-md5/dist/md5';

import { AuthService } from '../auth.service';
import { Login } from './login';

@Component({
  selector: 'gplay-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  formError = {
    status: true,
    message: ''
  };
  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(formData: FormGroup) {
    this.submitted = true;
    console.log('Valid?', formData.valid); // true or false
    console.log('Username', formData.value.username);
    console.log('Password', formData.value.password);
    formData.value.password = Md5.hashStr(formData.value.password);
    console.log('md5 Password', formData.value.password);

    if (formData.valid) {
      this.authService.login(formData.value.username, formData.value.password)
        .subscribe(
          () => {
            console.log('User is logged in');
            this.router.navigateByUrl('/');
          },
          (err) => {
            this.formError.status = true;
            if (err.status === 401) {
              this.formError.message = 'Username o password errate';
            }
            if (err.status === 404) {
              this.formError.message = 'Servizio momentaneamente non raggiungibile';
            }
          }
        );
    }
  }

}
