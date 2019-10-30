import { Component, Input } from '@angular/core';

@Component({
  selector: 'dsn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()  list: any [];
}
