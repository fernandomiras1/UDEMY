```html
<z-button [text]="text" [disabled]="disabled" [isLoading]="isLoading" (clickButton)="onClick()"></z-button>
```
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  title = 'ds-naranja';
  isLoading: boolean;
  text: string;
  disabled: boolean;

  ngOnInit() {
    this.text = 'Continuar';
    
  }

  onClick() {
    this.isLoading = true;
    this.text = '';

    setTimeout(() => {
      this.isLoading = false;
      this.text = 'Continuar';
    }, 5000);
  }
}

```
