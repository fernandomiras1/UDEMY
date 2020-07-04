import { Action } from '@ngrx/store';

export enum CountriesActionsTypes {
  FETCH_PENDING = '[COUNTRIES: PENDING]',
  FETCH_FULFILLED = '[COUNTRIES:  FULFILLED] Last',
  FETCH_ERROR = '[COUNTRIES: ERROR]  Last',
  CLEAR_DATA = '[COUNTRIES] CLEAR DATA',
}

export class FetchPending implements Action {
  readonly type = CountriesActionsTypes.FETCH_PENDING;
  constructor(public payload: any) { }
}

export class FetchFulfilled implements Action {
  readonly type = CountriesActionsTypes.FETCH_FULFILLED;
  constructor(public payload: any) { }
}

export class FetchError implements Action {
  readonly type = CountriesActionsTypes.FETCH_ERROR;
  constructor(public payload: any) { }
}

export class ClearData implements Action {
  readonly type = CountriesActionsTypes.CLEAR_DATA;
}

export type CountriesActions =
  FetchPending |
  FetchFulfilled |
  FetchError |
  ClearData;
