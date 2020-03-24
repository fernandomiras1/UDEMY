import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {of, Observable} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import { User } from './user.interface';
import * as md5 from 'md5';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User = null;
  public redirectUrl: string = null;

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  login(email, password): Observable<User> {
    const passwordHash = md5(password);
    return this.http.post<User>(environment.apiUrl + '/signup', {email, password: passwordHash})
    .pipe(
      tap(user => this.user = user),
      // guardamos los datos de usuario juto al token en localstorage 
      tap(user => localStorage.setItem('user', JSON.stringify(user)))
    );
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
