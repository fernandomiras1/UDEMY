```html
<z-confirmation-slider [text]="textSlider" [loading]="isLoading"
(confirm)="confirmDemo($event)"></z-confirmation-slider>

```
```typescript
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-slider-confirmation',
  templateUrl: './slider-confirmation.component.html',
  styleUrls: ['./slider-confirmation.component.scss']
})
export class SliderConfirmationComponent {
   public textSlider = 'Deslizá para confirmar';
   public isLoading = false;

  public confirmDemo(event) {
     this.isLoading = true;
     setTimeout(() => {
       this.isLoading = false;
       this.textSlider = 'Deslizá para confirmar';
     },         5000
     );
   }
}
```
