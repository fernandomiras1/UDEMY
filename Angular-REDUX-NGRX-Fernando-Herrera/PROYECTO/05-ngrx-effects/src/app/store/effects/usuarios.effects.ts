import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';



@Injectable()
export class UsuariosEffects {

  constructor(private actions$: Actions,
              private usuarioService: UsuarioService){}


  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      // Especificamos cual es la accion que me interesa escuchar.
      ofType(usuariosActions.cargarUsuarios),
      // dispara un nuevo observable que se uno con este.
      mergeMap(() => this.usuarioService.getUsers().pipe(
        tap(data => console.log('getUsers effects', data)),
        map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users})),
        catchError(err => of(usuariosActions.cargarUsuariosError({payload: err})))
      ))
    )
  );

}
