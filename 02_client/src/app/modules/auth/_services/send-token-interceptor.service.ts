import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthHTTPService } from './auth-http/auth-http.service';
import { AuthService } from './auth.service';


@Injectable()
export class SendTokenInterceptorService implements HttpInterceptor {
  private ROOT_URL = 'http://localhost:3000/';

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (!req.url.includes('tkn') && !req.url.includes('admin') && !req.url.includes('worker'))
      return next.handle(req);

    const authReq = req.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAuthFromLocalStorage().accessToken}`),
    });
    return next.handle(authReq);
  }
}
