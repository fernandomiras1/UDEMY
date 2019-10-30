```html
<z-tabs>
    <z-tab [title]="'Tarjeta Naranja'">
        <p class="z-body-text padding-16">Es la tarjeta de crédito ...</p>
    </z-tab>
    <z-tab [title]="'Plan Z'" [disabled]="true">
        <p class="z-body-text padding-16">Un plan de pago exclusivo ...</p>
    </z-tab>
    <z-tab [title]="'Smartes'">
        <p class="z-body-text padding-16">Un beneficio exclusivo ...</p>
    </z-tab>
    <z-tab [title]="'HBO GO'">
        <p class="z-body-text padding-16">HBO Go es una aplicación ...</p>
    </z-tab>
    <z-tab [title]="'Recargar celular'">
        <p class="z-body-text padding-16">Recarga por SMS si estás ...</p>
    </z-tab>
</z-tabs>
```
```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dsn-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

}
```
