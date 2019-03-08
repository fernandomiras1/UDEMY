import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as fromTodo from 'src/app/todo/todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: []
})
export class TodoAddComponent implements OnInit {

  txtInput: FormControl;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.txtInput = new FormControl(null, Validators.required);
  }

  agregarTodo() {
    if ( this.txtInput.valid ) {
      // Agregamos el texto en el TODO
      console.log(this.txtInput.value);
      const action = new fromTodo.AgregarTodoAction( this.txtInput.value );
      this.store.dispatch( action );
    }
  }

}
