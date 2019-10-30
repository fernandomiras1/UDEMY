```sass
.card-opera {

    &.browser-opera {
    
        display: block;
    }
}
```

```html
<z-card class="card card-opera" [clickable]="true" zBrowser>
  <p class="card-opera--text margin-bottom-16">Puede que nuestra página tenga algunos problemas con tu navegador</p>
  <p class="card-opera--text--secondary">Te recomendamos usar Google Chrome</p>
</z-card>               
<z-card class="card" [clickable]="true">
    <h2 class="z-overline margin-bottom-8">NARANJA ONLINE</h2>
    <h1 class="tit" style="margin-bottom: 10px;">En tu computadora</h1>
    <p class="text-card margin-bottom-16">Con tu DNI y clave, hacé todas tus operaciones en la sucursal virtual: pagá, consultá,
      simula compras y
      más.</p>
    <p class="link-doc">Ir a Naranja Online</p>
</z-card>          

```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'dsn-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent {
}
```
