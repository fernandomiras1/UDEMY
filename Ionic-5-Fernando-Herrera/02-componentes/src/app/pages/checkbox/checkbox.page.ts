import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.page.html',
  styleUrls: ['./checkbox.page.scss'],
})
export class CheckboxPage implements OnInit {

  public data = [
    { name: 'primary', selected: true },
    { name: 'secondary', selected: true },
    { name: 'danger', selected: true },
    { name: 'light', selected: true },
    { name: 'dark', selected: true }
  ];

  constructor() { }

  ngOnInit() {
  }


  onClick(check) {
    console.log(check);
  }

}
