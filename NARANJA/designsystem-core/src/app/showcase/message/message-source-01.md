```html
<!-- Alert: success -->
<z-message [text]="'Texto del Alert.'" [type]="'success'"></z-message>

<!-- Alert: warning -->
<z-message [text]="'Texto del Alert.'" [type]="'warning'"></z-message>

<!-- Alert: error -->
<z-message [text]="'Texto del Alert.'" [type]="'error'"></z-message>

```
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  ngOnInit() {
  }

}
```
