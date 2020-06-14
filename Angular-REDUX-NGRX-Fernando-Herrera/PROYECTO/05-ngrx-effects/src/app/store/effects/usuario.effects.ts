import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';



@Injectable()
export class UsuarioEffects {

  constructor(private actions$: Actions,
              private usuarioService: UsuarioService){}

  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      // Especificamos cual es la accion que me interesa escuchar.
      ofType(usuariosActions.cargarUsuario),
      // dispara un nuevo observable que se uno con este.
      mergeMap((action) => this.usuarioService.getUserById(action.id).pipe(
        tap(data => console.log('getUsers effects', data)),
        map(user => usuariosActions.cargarUsuarioSuccess({ usuario: user})),
        catchError(err => of(usuariosActions.cargarUsuarioError({payload: err})))
      ))
    )
  );

}
