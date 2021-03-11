import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserI } from '@app/models/auth';
import { environment } from '@environment/environment';
import { Plugins } from '@capacitor/core';
import { of, Observable } from 'rxjs';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.api_ok;
  private api_intranet = environment.api_intranet;
  private api_token = environment.api_token;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImNhbGlkYWQiLCJuYmYiOjE2MTQ2MjMzNzcsImV4cCI6MTYxNDYyNTE3NywiaWF0IjoxNjE0NjIzMzc3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ5MjIwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0OTIyMCJ9.2tV6kvJJxA4tnBL7R-nOcZtxZq7SyB3boW-y9pcQDuQ'
  constructor(private http: HttpClient) {
    this.getToken();
  }

  login(user: UserI) {
    console.log(user);
    // this.saveToken('holaEstoEsunaPrueba');
    const body = {
      "leg":"exb79522",
      "p":"Clarin2011",
      "route":"loguear"
      }
    // return this.http.get(this.api_intranet, { params: body});
    return this.http.post(this.apiUrl, body, { headers: this.addHeaders});
  }
  
  loginHttps(user: UserI) {
    console.log(user);
    // this.saveToken('holaEstoEsunaPrueba');
    const body = {
      "leg":"exb79522",
      "p":"Clarin2011",
      "route":"loguear"
      }
    return this.getTokenAPI().subscribe((token: string) => {
      console.log('get Token', token);
      return this.http.post(this.apiUrl, body, { headers: this.addHeaders});
    })
  }
 
  getTokenAPI(): Observable<string> {
    const body = {Username:"calidad",Password:"appcalidadAVI"}
    return this.http.post<string>(this.api_token, body);
  }

  async saveToken( token: string ) {
    this.token = token;
    await Storage.set({
      key: 'token',
      value: token
    });
  }

  async getToken() {
    this.token = (await Storage.get({ key: 'token'})).value || null;
  }

  get isValidUser() {
    return !!this.token;  
  }

  async removeUser() {
    this.token = null;
    await Storage.remove({ key: 'token'});
  }

  get addHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImNhbGlkYWQiLCJuYmYiOjE2MTUyOTk0MjgsImV4cCI6MTYxNTMwMTIyOCwiaWF0IjoxNjE1Mjk5NDI4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ5MjIwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0OTIyMCJ9.8a_vBuDs8QVuZ1R6-R4d-W2bpS18svLQVqjkKNAWKMM`,
    })
  }
}
