import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'gplay-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.userIsLogged()) {
      this.router.navigate(['/logged']);
    }
  }
}
