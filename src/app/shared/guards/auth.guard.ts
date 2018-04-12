import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    console.log('=============> canActivate', next, state);
    return this.checkLogin(url);
  }

  checkLogin(url) {
    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;
    //this.authService.getUserStatus
    if (this.authService.userIsLogged()) {
      return true;
    } else {
      // Navigate to the login page with extras
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
