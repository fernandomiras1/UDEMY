import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { GeneralService } from './general.service';
import { SessionManagerService } from './session-manager.service';


const URL = environment.URL + "/api";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private generalService: GeneralService,
              private router: Router) { }

  auth(username, password) {
    let params = new HttpParams()
        .append('username', username)
        .append('password', password)
    return this.http.post(`${URL}/auth/login`, params);
  }
  isLogged() {
    return SessionManagerService.getItem('authClaro') ? true : false;
  }
  setDataLogin(resp) {
    SessionManagerService.setItem('userClaro', JSON.stringify(resp['user']));
    SessionManagerService.setItem('authClaro', JSON.stringify(resp['auth']));
    this.generalService.user = resp['user'];
    this.generalService.init();
    this.router.navigateByUrl('home');
  }
  async clearClaroStorage() {
    await SessionManagerService.removeItem('userClaro');
    await SessionManagerService.removeItem('authClaro');
    this.router.navigateByUrl('login');
  }
}
