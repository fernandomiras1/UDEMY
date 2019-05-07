import { Todo } from './todo/model/todo.model';
import { ActionReducerMap } from '@ngrx/store';

import * as fromFiltro from 'src/app/filter/filter.reducer';
import * as fromTodo from './todo/todo.reducer';

import * as fromFiltroActions from  './filter/filter.action';

// Definimos el estado de mi aplicacion ( forma global que va a manejar mi store )

// Definimos los datos q va a manejar mi reducer
export interface AppState {
    todos: Todo[];
    filtro: fromFiltroActions.filtrosValidos;
}

export const appReducers: ActionReducerMap<AppState> = {
    todos: fromTodo.todoReducer,
    filtro: fromFiltro.filtroReducer
};
