import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresosEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosSubs: Subscription;
  constructor(private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubs = this.store.select('user').pipe(
      filter( auth => auth.user != null)).subscribe( ({user}) => {
        this.ingresosSubs = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
          .subscribe(inresoEgresoFB => {
            this.store.dispatch(ingresosEgresoActions.setItems({ items: inresoEgresoFB }))
          })
      })
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.ingresosSubs?.unsubscribe();
  }

}
