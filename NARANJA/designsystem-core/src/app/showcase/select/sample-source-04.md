```html
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
    <p class="z-highlight-2 margin-bottom-16 margin-top-32">Posición por defecto</p>
    <z-select [items]="itemsProductos" [dropUp]="true"
              [placeholderDefault]="'Producto'"
              [messagesError]="'Seleccioná un producto'">
    </z-select>
  </div>

  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
    <p class="z-highlight-2 margin-bottom-16 margin-top-32">Posición hacia abajo</p>
    <z-select [items]="itemsProductos" [dropUp]="false"
              [placeholderDefault]="'Producto'"
              [messagesError]="'Seleccioná un producto'">
    </z-select>
  </div>
</div>
 
```

