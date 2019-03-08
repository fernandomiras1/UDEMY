import { AuthService, IAuthentication } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthGuard implements CanActivate  {
  public authenticationData: IAuthentication;
  constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar) {
    this.authenticationData = AuthService.authData;
  }

  canActivate(): boolean {
    // && new Date().getTime() < tokenExpiration
    if (this.authService.loggedIn()) {
      return true;
    }


    this.authService.onLogout();
    return false;
  }

  // CanActivateChild(): boolean {
  //   if (!this.authenticationData.permissions.NovedadesConsulta || !this.authenticationData.permissions.SueldoCruceroConsulta ) {
  //     this.authService.onLogout();
  //     return false;
  //   }
  //   return true;
  // }
}
