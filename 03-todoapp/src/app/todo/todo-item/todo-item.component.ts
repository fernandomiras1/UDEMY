import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  editando: boolean;

  checkField: FormControl;
  txtInput: FormControl;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {

    this.checkField = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );

    this.checkField.valueChanges.subscribe(() => {
        const accion = new ToggleTodoAction( this.todo.id );
        this.store.dispatch( accion );
    });
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  public terminarEdicion(): void {
    this.editando = false;
    // Pregutno si se modifico o no.
    if ( this.txtInput.value === this.todo.texto ) { return; }

    if ( this.txtInput.valid ) {
      console.log('Accion Editar');
      const accion = new EditarTodoAction( this.todo.id, this.txtInput.value);
      this.store.dispatch( accion );
    }
  }

  public borrar(): void {
    const accion = new BorrarTodoAction( this.todo.id );
    this.store.dispatch( accion );
  }

}
