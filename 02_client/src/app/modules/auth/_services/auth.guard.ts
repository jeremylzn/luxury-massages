import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authData = JSON.parse(localStorage.getItem(this.authLocalStorageToken));
    if (authData) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.authService.clearLocalStorage();
    return false;
  }
}
