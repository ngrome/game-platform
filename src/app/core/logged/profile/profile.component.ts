import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Md5 } from 'ts-md5/dist/md5';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'gplay-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  submitted = false;
  formError = {
    status: true,
    message: '',
  };
  profileForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required],
    });
  }

  onSubmit(formData: FormGroup) {
    this.submitted = true;

    formData.value.oldPassword = formData.value.oldPassword;
    formData.value.newPassword = formData.value.newPassword;

    if (formData.valid) {
      this.authService
        .changePassword(formData.value.oldPassword, formData.value.newPassword)
        .subscribe(
          response => {
            console.log('Password change success ', response);
          },
          err => {
            this.formError.status = true;
            console.warn(err);
            if (err.status === 401) {
              this.formError.message = 'No permission to change password';
            }
            if (err.status === 404) {
              this.formError.message =
                'Servizio momentaneamente non raggiungibile';
            }
          }
        );
    }
  }
}
