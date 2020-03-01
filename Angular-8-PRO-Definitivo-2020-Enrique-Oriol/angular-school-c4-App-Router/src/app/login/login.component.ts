import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login().subscribe(user => {
      if (user != null) {
        // de esta forma te reddireciona a la ultima ruta
        const destination = this.authService.redirectUrl ? this.route.parseUrl(this.authService.redirectUrl) : '';
        this.route.navigateByUrl(destination);
      }
    });
  }

}
