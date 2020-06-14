import { createReducer, on } from '@ngrx/store';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuarioState {
  id    : number,
  user : Usuario,
  loaded: boolean,
  loading: boolean,
  error : any
}

export const usuarioInitialState: UsuarioState = {
  id    : null,
  user  : null,
  loaded: false,
  loading: false,
  error : null
}

const _usuarioReducer = createReducer(usuarioInitialState,

  on(cargarUsuario, (state, {id}) => ({
    ...state,
    loading: true,
    id: id
  })),

  on(cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: {...usuario }
  })),

  on(cargarUsuarioError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  })),

);

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}
