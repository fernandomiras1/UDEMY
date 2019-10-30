import { Component } from '@angular/core';

@Component({
  selector: 'dsn-ksslidercontrol',
  templateUrl: './ks-slider-control.component.html',
  styleUrls: ['./ks-slider-control.component.scss']
})
export class KsSliderControlComponent {
  min = 0;
  max = 2000;
  step = 1;
  disabled = false;
  titleActive = '¿Tus ingresos aproximados?';
  prefix = '$';
}
