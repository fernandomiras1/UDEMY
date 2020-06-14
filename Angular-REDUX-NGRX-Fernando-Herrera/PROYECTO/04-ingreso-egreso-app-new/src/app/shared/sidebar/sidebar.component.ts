import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  nombre: string;
  email: string;
  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {

    this.userSubs = this.store.select('user').pipe(
      filter(({user}) => user != null)).subscribe( ({user}) => {
        this.nombre = user.nombre;
        this.email = user.email;
      })
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    })

  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }

}
