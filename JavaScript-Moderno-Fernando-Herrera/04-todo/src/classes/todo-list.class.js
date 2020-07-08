export class TodoList {
    constructor() {
        this.todos = [];
    }

    nuevoTodo( todo ) {
        this.todos.push(todo);
    }

    borrarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            if ( todo.id === id ) {
                todo.completado = !todo.completado;
                break;
            }
        }
    }

    borrarCompletado() {
        
    }
}