import { CountriesActions, CountriesActionsTypes } from './countries.actions';

export interface ICountries {
  data: any;
  pending: boolean;
  error: boolean;
  isFetchCompleted: boolean;
}

export const initialState: ICountries = {
  data: null,
  pending: null,
  error: null,
  isFetchCompleted: null,
};

export function reducer(state = initialState, action: CountriesActions): ICountries {
  switch (action.type) {
    case CountriesActionsTypes.FETCH_PENDING:
      return { ...state, pending: true };

    case CountriesActionsTypes.FETCH_FULFILLED:
      return {
        ...state,
        pending: false,
        isFetchCompleted: true,
        error: false,
        data: action.payload,
      };

    case CountriesActionsTypes.FETCH_ERROR:
      return {
        ...state,
        pending: false,
        isFetchCompleted: false,
        error: true,
        data: null,
      };

    case CountriesActionsTypes.CLEAR_DATA:
      return initialState;

    default:
      return state;
  }
}
