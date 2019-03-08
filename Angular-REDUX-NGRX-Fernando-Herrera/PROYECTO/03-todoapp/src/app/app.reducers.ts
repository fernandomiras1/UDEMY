import { Todo } from './todo/model/todo.model';

// Definimos el estado de mi aplicacion ( forma global que va a manejar mi store )

// Definimos los datos q va a manejar mi reducer
export interface AppState {
    todos: Todo[];
}
