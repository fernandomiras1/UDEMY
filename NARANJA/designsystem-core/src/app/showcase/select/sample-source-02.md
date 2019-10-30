```html
  <z-select [items]="itemsProductos" [submit]="submitValidation"
    [placeholderDefault]="'Producto'"
    [menssagesError]="'Seleccioná un producto'">
  </z-select>

  <z-button text="Enviar" (clickButton)="submit()"></z-button>
 

```
```typescript
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dsn-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  
  submitValidation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  itemsProductos = [{ id: 1, text: 'Convivimos', disabled: false },
      { id: 2, text: 'HBO', disabled: false },
      { id: 2, text: 'Préstamo', disabled: false },
      { id: 2, text: 'Seguro', disabled: false },
      { id: 3, text: 'Tarjetas', disabled: true }];
  
  submit() {
    this.submitValidation.next(true);
  }

}
```
