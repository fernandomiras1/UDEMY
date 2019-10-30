```html
<z-select [items]="items">

</z-select>

```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'dsn-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  
   items = [{ id: 1, text: 'Córdoba' },
     { id: 2, text: 'Buenos Aires' },
     { id: 3, text: 'Corrientes' }];

}
```
