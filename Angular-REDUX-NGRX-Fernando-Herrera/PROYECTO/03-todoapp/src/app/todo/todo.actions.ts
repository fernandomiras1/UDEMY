import { Action } from '@ngrx/store';

// Agregamos todas las acciones que va a tener el TODO

export const AGREGAR_TODO = '[TODO] Agregar todo';

export const TOGGLE_TODO = '[TODO] Toggle todo';
export const TOGGLE_ALL_TODO = '[TODO] Toggle All todo';

export const EDITAR_TODO = '[TODO] Editar todo';
export const BORRAR_TODO = '[TODO] Borrar todo';

export class AgregarTodoAction implements Action {
    readonly type = AGREGAR_TODO;

    constructor( public texto: string ) {}
}

export class ToggleTodoAction implements Action {
    readonly type = TOGGLE_TODO;

    constructor( public id: number ) {}
}

export class ToggleAllTodoAction implements Action {
    readonly type = TOGGLE_ALL_TODO;

    constructor( public completado: boolean ) {}
}

export class EditarTodoAction implements Action {
    readonly type = EDITAR_TODO;

    constructor( public id: number, public texto: string ) {}
}

export class BorrarTodoAction implements Action {
    readonly type = BORRAR_TODO;

    constructor( public id: number ) {}
}

export type Acciones = ToggleTodoAction | AgregarTodoAction | ToggleAllTodoAction | EditarTodoAction | BorrarTodoAction;
