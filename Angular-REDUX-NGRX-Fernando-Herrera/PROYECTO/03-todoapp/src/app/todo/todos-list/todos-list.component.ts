import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})
export class TodosListComponent implements OnInit {

  todos: Todo[] = [];
  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    // ME subscribo para eschcuar todos los cambios que sufra el Store
    this.store.subscribe( state => {
      this.todos = state.todos;
    });
  }

}
