import { AuthActionTypes, AuthActions } from './auth.actions';

export interface AppUser {
  data: any;
  pending: boolean;
  error: boolean;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: AppUser;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    data: null,
    pending: true,
    error: null,
  },
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        isLoggedIn: true,
        user: {
          data: action.payload,
          pending: false,
          error: false,
        },
      };
    case AuthActionTypes.LoginFailure:
      return {
        ...initialState,
        user: {
          ...initialState.user,
          error: action.payload,
        },
      };
    case AuthActionTypes.Logout:
      return initialState; // the initial state has isLoggedIn set to false

    default:
      return state;
  }
}
