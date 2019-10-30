```html
<z-card class="card" zOuterClick (clickOutside)="onClickOutside()">
    <div class="card--text">{{ title }}</div>
    <div class="card--number">{{ number }}</div>  
</z-card>

```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'dsn-click-outside',
  templateUrl: './click-outside.component.html',
  styleUrls: ['./click-outside.component.scss']
})
export class ClickOutsideComponent {
  public number: any = 0;
  // tslint:disable-next-line:prefer-template
  public title: any = 'El número cambiará cada vez que hagas clic fuera de esta card: ';
  // tslint:disable-next-line:max-line-length
  public description = `Usamos esta directiva cuando necesitamos ejecutar una acción luego de que el usuario hace click fuera de un elemento.`;

  constructor() {}

  onClickOutside() {
    // tslint:disable-next-line:prefer-template
    this.title = `El número cambiará cada vez que hagas clic fuera de esta card: `;
    // tslint:disable-next-line:block-spacing
    this.number = `${Math.round(Math.random() * 10)}`;
  }
}

```
