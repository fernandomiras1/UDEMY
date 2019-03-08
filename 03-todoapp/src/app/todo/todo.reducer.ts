import * as fromTodo from '../todo/todo.actions';
import { Todo } from './model/todo.model';

// Inicializamos la app con dos todos.
const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el Mundo');

const estadoInicial: Todo[] = [todo1, todo2];

export function todoReducer( state = estadoInicial, accion: fromTodo.Acciones ): Todo[] {


    switch ( accion.type ) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo( accion.texto );
            // Con ES6 operdador Spret: Clonamos el estado actual ( ya que no se puede hacer un push )
            return [ ...state, todo ];

        case fromTodo.TOGGLE_TODO:

            return state.map( todoEdit => {
                if ( todoEdit.id === accion.id ) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.TOGGLE_ALL_TODO:

        return state.map( todoEdit => {
                return {
                    ...todoEdit,
                    completado: accion.completado
                };
        });

        case fromTodo.EDITAR_TODO:

            return state.map( todoEditTexto => {
                if ( todoEditTexto.id === accion.id ) {
                    return {
                        ...todoEditTexto,
                        texto: accion.texto
                    };
                } else {
                    return todoEditTexto;
                }
            });

        case fromTodo.BORRAR_TODO:
            return state.filter( todoBorrar => todoBorrar.id !== accion.id);

        default:
            return state;
    }

}
