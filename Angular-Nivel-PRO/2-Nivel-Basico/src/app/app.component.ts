import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  counterProgress:number = 0;
  totalCountdown: number = 15

  constructor() { }

  updateProgress($event) {
    // Como tiene que ser en porcentaje
    this.counterProgress = (this.totalCountdown - $event )/ this.totalCountdown * 100;
  }

  countdownFinished() {
    console.log('el contador esta finalizado');
  }

}
