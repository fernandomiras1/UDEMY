import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  imgLogo = 'assets/img/logo.jpg';
  imgCard = 'assets/img/cart.png';

  constructor() { }

  ngOnInit() {
  }

}
