```html
<!-- Active -->
<z-slider-control 
    [min]="min"
    [max]="max"
    [step]="step"
    [disabled]="false"
    [prefix]="prefix"
    (valuesChange)="valuesChange($event)"
    [title]="tituloActive">
</z-slider-control>

<!-- Disabled -->
<z-slider-control 
  [min]="min"
  [max]="max"
  [step]="step"
  [disabled]="true"
  [prefix]="prefix"
  (valuesChange)="valuesChange($event)"
  [title]="tituloActive">
</z-slider-control>

```
```typescript
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-slider-control',
  templateUrl: './slider-control.component.html',
  styleUrls: ['./slider-control.component.scss']
})
export class SliderControlComponent {
  min = 0;
  max = 2000;
  step = 1;
  disabled = false;
  titleActive = '¿Tus ingresos aproximados?';
  prefix = '$';
}
```
