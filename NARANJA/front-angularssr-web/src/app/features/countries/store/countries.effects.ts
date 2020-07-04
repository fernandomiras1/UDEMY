import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CountriesActionsTypes } from './countries.actions';
import { CountriesService } from '../services/countries.service';

@Injectable()
export class CountriesEffects {
  constructor(
    private actions$: Actions,
    private countriesService: CountriesService,
  ) { }

  @Effect() getCountries$ = this.actions$
    .pipe(ofType(CountriesActionsTypes.FETCH_PENDING))
    .pipe(
      map((action: any) => action.payload),
      switchMap((payload: any) => {
        return this.countriesService.getCountries().pipe(
          map(response => ({ type: CountriesActionsTypes.FETCH_FULFILLED, payload: response })),
          catchError((err: HttpErrorResponse) => of({ type: CountriesActionsTypes.FETCH_ERROR, payload: err })),
        );
      }),
    );
}
