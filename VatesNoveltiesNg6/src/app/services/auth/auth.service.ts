import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { ClaimPermission } from 'src/app/interfaces/ClaimPermission';

@Injectable()
export class AuthService {
  private static _authData: IAuthentication;
  private readonly _loginUrl = `${ environment.novApiUrl }auth/login`;

  constructor(private router: Router, private _http: HttpClient) { }

  public static get authData(): IAuthentication {
    if (isNullOrUndefined(this._authData)) {
      const tokenLocalStorage = localStorage.getItem('token');

      this.authData = !isNullOrUndefined(tokenLocalStorage) ? JSON.parse(tokenLocalStorage) : null;
    }

    return this._authData;
  }

  public static set authData(value: IAuthentication) {
    this._authData = value;
  }

  public login(model: any): Observable<void> {
    const _body = this.loginRequestBody(model);

    return this._http.post(this._loginUrl, _body).pipe(
      map((response: any) => {
        this.setAuthenticationData(response);
      })
     );
  }

  public refreshToken(): Observable<any> {
    const _body = this.refreshRequestBody();
    return this._http.post<any>(this._loginUrl, _body.toString()).pipe(
      map((response: any) => {
        this.setAuthenticationData(response);

        return <any> response;
      })
    );
  }

  public loggedIn(): boolean {
    if (this.isTokenExpired && this.getTokenData('accessToken')) {
     return true;
    }

    return false;
  }

  public isTokenExpired(): boolean {
    const tokenExpiration: any = localStorage.getItem('token_expiration');

    if (tokenExpiration && new Date().getTime() < tokenExpiration) {
      return false;
    }

    return true;
  }

  public getTokenData(propertyName: string): any {
    const result = JSON.parse(localStorage.getItem('token'));

    if (result == null) {
      return null;
    }

    if (propertyName) {
      return result[propertyName];
    } else { return result; }
  }

  public getAccessToken(): any {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenData = JSON.parse(token);

      return tokenData.accessToken;
    }

    return null;
  }

  public getUserName(): string {
    const userName: string = this.getTokenData('userName');

    return userName;
  }

  public getUserFullName(): string {
    const userFullName: string = this.getTokenData('userFullName');

    return userFullName;
  }

  public onLogout(): void {
    this.logoutUser();
  }

  public logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
    AuthService.authData = null;
    this.router.navigate(['/login']);
  }

  private refreshRequestBody(): string {
    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', this.getTokenData('refreshToken'));
    return body.toString();
  }

  private loginRequestBody(model: any) {
    const body = new URLSearchParams();

    body.append('grant_type', 'password');
    body.append('username', model.username);
    body.append('password', model.password);

    return body.toString();
  }

  private setAuthenticationData(data: any): void {
      const tokenExpiration = new Date().getTime() + (data.expires_in * 1000);
      const authorizationData: IAuthentication = {
        userName: data.user_name,
        userFile: Number(data.user_file),
        userFullName: data.full_name,
        refreshToken: data.refresh_token,
        accessToken: data.access_token,
        permissions: <ClaimPermission> JSON.parse(data.permissions)
      };
      localStorage.setItem('token', JSON.stringify(authorizationData));
      localStorage.setItem('token_expiration', tokenExpiration.toString());
    }
}

export interface IAuthentication {
  userName: string;
  userFile: number;
  userFullName: string;
  refreshToken: string;
  accessToken: string;
  permissions: ClaimPermission;
}
