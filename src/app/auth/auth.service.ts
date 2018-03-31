import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';


@Injectable()
export class AuthService {

  private url: String = 'api/auth';
  private token: String;

  private userIsLoggedIn = false;

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
      .map((response: Response) => {
        const authInfo = response.json();
        if (this.setSession(authInfo)) {
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
    if (this.token !== '') {
      _toReturn = true;
    }
    return _toReturn;
  }

}
