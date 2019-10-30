import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'dsn-kitchensink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.scss']
})
export class KitchenSinkComponent  implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

}
