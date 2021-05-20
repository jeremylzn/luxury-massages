import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../_models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../_models/auth.model';

const API_USERS_URL = `${environment.apiUrl}/users`;

const ROOT_URL = window.location.protocol + '//' + window.location.hostname + ':3000/';
// const ROOT_URL = 'http://161.97.157.17:3000/';
// const ROOT_URL = 'http://127.0.0.1:3000/';
// const ROOT_URL = 'http://' + window.location.hostname + ':3000/';

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private http: HttpClient) { }

  // public methods
  login(email: string, password: string): Observable<any> {
    // return this.http.post<AuthModel>(API_USERS_URL,   { email, password });
    return this.http.post<AuthModel>(ROOT_URL + 'login', { email, password });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel) {
    // return this.http.post<UserModel>(API_USERS_URL, user);
    return this.http.post<UserModel>(ROOT_URL + 'signup', user);
  }

  // LOGOUT =>  POST: logout user logged
  logout() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${JSON.parse(localStorage.getItem(this.authLocalStorageToken)).accessToken}`)
    }
    console.log(header)
    return this.http.post(ROOT_URL + 'tkn/logout', {}, header).subscribe();
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

    getUserByToken(token): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_USERS_URL}`, {
      headers: httpHeaders,
    });
  }
}
