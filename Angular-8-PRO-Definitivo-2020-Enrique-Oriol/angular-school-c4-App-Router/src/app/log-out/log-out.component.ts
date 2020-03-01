import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  cancel() {
    this.closePopup();
  }

  leave() {
    this.authService.logout();
    this.closePopup('login');
  }

  closePopup(redirectRoute?) {
    if (redirectRoute) {
      this.router.navigate([{outlets: { primary: redirectRoute, popup: null}}]);
    } else {
      // de este modo eliminamos la ruta secundaria.
      // eliminamos el contenido que tenia ese name outelt
      this.router.navigate([{outlets: {popup: null}}]);
    }
  }

}
