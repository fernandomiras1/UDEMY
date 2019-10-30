```html
<!-- caso: con Input -->
<z-switch [switch]="switch" [type]="'right-align'">
</z-switch>

```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'dsn-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  switch = { text: 'Habilitar notificaciones', selected: false, disabled: false };

}
```
