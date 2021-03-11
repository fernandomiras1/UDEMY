import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-popover',
  templateUrl: './filter-popover.component.html',
  styleUrls: ['./filter-popover.component.scss'],
})
export class FilterPopoverComponent implements OnInit {
  origenToggle = false;
  dateTo: Date = new Date();
  dateFrom: Date = new Date();

  origenList = [
    {name: 'Guardia', model: false},
    {name: 'AVI', model: false},
    {name: 'SES', model: false},
    {name: 'PUMA', model: false},
    {name: 'Alarmas', model: false},
  ] 
  constructor() { }

  ngOnInit() {}


  onSearch() {
    console.log(this.origenList);
  }
}
