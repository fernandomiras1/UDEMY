import { Todo } from '../classes'; 
import { todoList } from '../index'; 

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo'); 
const btnBorrarAll    = document.querySelector('.clear-completed'); 


export const crearTodoHtml = (todo) => {
    
    const htmlTodo = `
    <li class="${ todo.completado ? 'completed': '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ todo.completado ? 'checked': ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}


// Eventos 

txtInput.addEventListener('keyup', ( event ) => {
    event.preventDefault();
    if ( event.keyCode == 13 && event.target.value.length > 0 ) {
        const nuevoTodo = new Todo(event.target.value);
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml(nuevoTodo);
        event.target.value = '';
    }

});

divTodoList.addEventListener('click', (event) => {

    // podemos especificar en que parte del li hice click (label, input o button)
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento   = event.target.parentElement.parentElement; // obtenemos la referencia completa al <li>
    const todoId         = todoElemento.getAttribute('data-id'); // recuperamos el id del li
    
    // maracar el todo como completado
    if ( nombreElemento.includes('input') ) { // click en check
        todoList.marcarCompletado( todoId );
        // agregamos o quitamos la clase completed
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) { // hay que borar el usuario

        todoList.borrarTodo(todoId);
        divTodoList.removeChild(todoElemento); // elminimaos un elemento en html
    } 

});

btnBorrarAll.addEventListener('click', () => {
   
    todoList.borrarCompletado();
    // vamos a comenzar de abajo hacia arriba
    for (let i = divTodoList.children.length -1; i>=0; i-- ) {
        // const elemento = divTodoList
    }

});