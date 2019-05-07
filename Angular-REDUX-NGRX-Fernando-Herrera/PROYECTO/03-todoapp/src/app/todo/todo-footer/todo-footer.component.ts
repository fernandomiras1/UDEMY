import { Component, OnInit } from '@angular/core';

import * as fromFiltro from '../../filter/filter.action';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  
  constructor() { }

  ngOnInit() {
  }

}
