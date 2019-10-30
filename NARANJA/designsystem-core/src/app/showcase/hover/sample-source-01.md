```html
<div zhover [isHover]="true"
            [stylesEnter]="hoverStylesEnter" 
            [stylesLeave]="hoverStylesLeave"
            [breakpointMinWithoutStyles]="767">
  {{ title }}
</div> 

```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'dsn-hover',
  templateUrl: './hover.component.html',
  styleUrls: ['./hover.component.scss']
})
export class HoverComponent {

  public hoverStylesEnter = [{ style: 'background', value: '#FFC096' }];
  public hoverStylesLeave = [{ style: 'background', value: 'none' }];
  
  constructor() {}

}

```
