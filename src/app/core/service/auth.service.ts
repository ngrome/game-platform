import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { Auth } from '../interface/auth';

@Injectable()
export class AuthService {
  private url: String = 'api/auth';
  private token: String;
  private authResult;
  public userIsLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

    return this.http
      .post<Auth>('/api/login', parameter)
      .map((response: Auth) => {
        if (this.setSession(response)) {
          return true;
        } else {
          return false;
        }
      });
  }

  /**
   *
   * @param oldPassword
   * @param newPassword
   */
  changePassword(oldPassword: String, newPassword: String) {
    const parameter = {
      passwordOld: oldPassword,
      passwordNew: newPassword,
    };

    const path = `/api/changepassword`;

    return this.http
      .post<Auth>(path, { params: parameter })
      .map((response: Auth) => {
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

  setSession(authResult: Auth) {
    this.userIsLoggedIn = true;
    this.userIsLoggedIn$.next(true);
    this.token = authResult.token;
    this.authResult = authResult.id;
    //use cookie if browser doesn't support
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

  getUserStatus() {
    return this.userIsLoggedIn$.getValue();
  }
}
