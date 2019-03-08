import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private authService: AuthService) {}
   ngOnInit() {
     if (this.authService.isTokenExpired()) {
       this.authService.logoutUser();
     }
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
