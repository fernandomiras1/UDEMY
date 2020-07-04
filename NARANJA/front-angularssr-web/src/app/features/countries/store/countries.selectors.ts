import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCountries from './countries.reducer';
export const selectCountriesState = createFeatureSelector<fromCountries.ICountries>('countries');
export const selectData = createSelector(selectCountriesState, (state: fromCountries.ICountries) => {
  if (state.isFetchCompleted) {
    return state.data;
  }
});
