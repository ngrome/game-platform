import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

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
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
