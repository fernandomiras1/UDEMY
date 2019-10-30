```html
<z-card [clickable]="isClickable" 
        [styleList]="styleArray"
        (clickCard)="showConsole()">
            <h2 class="z-overline margin-bottom-8">NARANJA ONLINE</h2>
            <h1 class="z-title" style="margin-bottom: 10px;">
            En tu computadora</h1>
            <p class="z-body-text margin-bottom-16">
            Con tu DNI y clave, hace todas tus operaciones en la 
            sucursal virtual: pagá, consultá,
            simula compras y más.</p>
            <p class="link-doc">Ir a Naranja Online</p>
</z-card>

```
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class ButtonComponent implements OnInit {
  isClickable = true;
  styleArray: any;
  disabled: boolean;

  ngOnInit() {
    this.styleArray = { 'padding': '24px 24px 24px 24px', 
                        'background-color': 'red'
                      };
  }
  
  showConsole(): void {
  }
}

```
