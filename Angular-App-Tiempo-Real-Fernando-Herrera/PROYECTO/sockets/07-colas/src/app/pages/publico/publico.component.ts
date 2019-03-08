import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('container');
  }

}
