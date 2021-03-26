import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(public loginservice: LoginService, private router: Router) {}
  canActivate() {
    if(!this.loginservice.isLogged()) {
      return true;
    } else {
      this.router.navigateByUrl('home');
      return false;
    }
  }
  
}
