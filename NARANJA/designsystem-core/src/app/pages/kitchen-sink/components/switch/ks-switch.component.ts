import { Component } from '@angular/core';

@Component({
  selector: 'dsn-ksswitch',
  templateUrl: './ks-switch.component.html',
  styleUrls: ['./ks-switch.component.scss']
})
export class KsSwitchComponent {
  switchOn = { text: 'Habilitar notificaciones', selected: true, disabled: false };
  switchDisabled = { text: 'Habilitar notificaciones', selected: false, disabled: true };
  switchOnLeft = { text: 'Habilitar notificaciones', selected: true, disabled: false };
  switchDisabledLeft = { text: 'Habilitar notificaciones', selected: false, disabled: true };
}
