import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
// Agregamos los datos del usuario activo
export const setUser = createAction(
  '[Auth] setUser',
  props<{ user: Usuario }>()
);

// quitamos los datos del usuario activo. cuando hacemos cerrar sesion.
export const unSetUser = createAction('[Auth] unSetUser');
