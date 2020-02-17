import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bar-button',
  templateUrl: './bar-button.component.html',
  styleUrls: ['./bar-button.component.scss']
})
export class BarButtonComponent implements OnInit {

  @ViewChild('btn') button;
  constructor() { }

  ngOnInit() {
  }

}
