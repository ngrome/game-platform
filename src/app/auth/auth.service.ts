import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  private url: String = 'api/auth';
  private token: String;
  private authResult;

  private userIsLoggedIn = false;

  // store the URL so we can redirect after logging in
  private redirectUrl: string;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }
  /**
   *
   *
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  login(email: String, password: String) {
    const parameter = {
      username: email,
      password: password,
    };

    return this.http.post('/api/login', parameter).map((response: Response) => {
      if (this.setSession(response)) {
        return true;
      } else {
        return false;
      }
    });
  }

  changePassword(oldPassword: String, newPassword: String) {
    const parameter = {
      passwordOld: oldPassword,
      passwordNew: newPassword,
    };

    const path = `/api/changepassword`;

    return this.http.post(path, parameter).map((response: Response) => {
      if (this.setSession(response)) {
        return true;
      } else {
        return false;
      }
    });
  }

  /**
   *
   *
   * @private
   * @param {any} authResult
   * @memberof AuthService
   */
  setSession(authResult) {
    this.userIsLoggedIn = true;
    this.token = authResult.token;
    this.authResult = authResult;
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('authResult', JSON.stringify(authResult));

    // check the token
    return true;
  }

  userIsLogged() {
    let _toReturn = false;

    if (this.userIsLoggedIn === false) {
      this.token = localStorage.getItem('token');
    }
    if (this.token && this.token !== '') {
      _toReturn = true;
    }
    return _toReturn;
  }
}
