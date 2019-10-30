```html
<z-card class="card" zRipple [clickable]="true">
  <div class="card--text">{{ title }}</div>
</z-card>

```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'dsn-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.scss']
})
export class RippleComponent {
  // tslint:disable-next-line:prefer-template
  constructor() {}

}


```
