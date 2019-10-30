```html
<!-- caso: primario -->
<z-loading type="primary"></z-loading>

<!-- caso: primario con background naranja-->
<z-loading type="primary" withBg="true"></z-loading>

```
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  ngOnInit() {
  }

}
```
