import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Auth Page] Login',
  LoginComplete = '[Auth Page] Login Complete',
  LoginSuccess = '[Auth API] Login Success',
  LoginFailure = '[Auth API] Login Failure',
  Logout = '[Auth] Confirm Logout',
  LogoutCancelled = '[Auth] Logout Cancelled',
  LogoutConfirmed = '[Auth] Logout Confirmed',
  LogoutTimeOutKeepAlive = '[Auth] Confirm LogoutTimeOutKeepAlive',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload = '/') { }
}

export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LoginComplete;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutConfirmed implements Action {
  readonly type = AuthActionTypes.LogoutConfirmed;
}

export class LogoutCancelled implements Action {
  readonly type = AuthActionTypes.LogoutCancelled;
}

export class LogoutTimeOutKeepAlive implements Action {
  readonly type = AuthActionTypes.LogoutTimeOutKeepAlive;
}

export type AuthActions =
  | Login
  | LoginComplete
  | LoginSuccess
  | LoginFailure
  | Logout;
