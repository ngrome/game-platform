import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';


@Injectable()
export class AuthService {

  private url: String = 'api/auth';
  private isLoggedIn = false;

  // store the URL so we can redirect after logging in
  private redirectUrl: string;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  /**
   *
   *
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  login(email: String, password: String) {

    const parameter = {
      username: email,
      password: password
    };

    return this.http.post('/api/login', parameter)
      .do(res => this.setSession)
      .shareReplay();
  }

  /**
   *
   *
   * @private
   * @param {any} authResult
   * @memberof AuthService
   */
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

}
