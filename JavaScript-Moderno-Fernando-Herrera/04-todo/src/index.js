const { saludar, crearTodoHtml } = require("./js/componentes");
import './styles.css';

import {  Todo, TodoList } from './classes';

const tarea = new Todo('Aprender');
export const todoList = new TodoList();


console.log(todoList.todos);
todoList.todos.forEach( crearTodoHtml );

// crearTodoHtml(tarea);

