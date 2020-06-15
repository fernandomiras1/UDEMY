import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.page.html',
  styleUrls: ['./refresher.page.scss'],
})
export class RefresherPage implements OnInit {

  items: any[] = [];
  constructor() { }

  ngOnInit() {
  }

  doRefresh(event) {

    setTimeout(() => {
      // agregamos datos al array
      this.items = Array(40);
      // ya termino el proceso de carga
      event.target.complete();
    }, 2000);
  }

}
