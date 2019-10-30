import { Component } from '@angular/core';

@Component({
  selector: 'dsn-kscard',
  templateUrl: './ks-card.component.html',
  styleUrls: ['./ks-card.component.scss']
})
export class KsCardComponent {

  styleArray = { padding: '24px' };

  showConsole(): void {
    console.log('Card clickeada');
  }

}
