import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as fromActionsCountries from '../../store/countries.actions';
import { ICountries } from '../../store/countries.reducer';
import * as fromSelectorCountries from '../../store/countries.selectors';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
})
export class CountriesComponent implements OnInit, OnDestroy {
  countriesSubscription: Subscription;
  countries: any[] = [];
  constructor(private store: Store<ICountries>) { }

  ngOnInit() {
    this.dispatchActions();
    this.mapState();
  }

  mapState() {
    this.countriesSubscription = this.store
      .pipe(select(fromSelectorCountries.selectData))
      .pipe(
        filter(val => !!val),
      ).subscribe(
        (countries) => {
          countries.map((country) => {
            this.countries.push({
              id: country.area,
              text: country.name,
              disabled: false,
            });
          });

        });
  }

  dispatchActions() {
    this.store.dispatch(new fromActionsCountries.FetchPending({
      id: 1,
    }));
  }

  ngOnDestroy() {
    if (this.countriesSubscription) {
      this.countriesSubscription.unsubscribe();
    }
  }
}
