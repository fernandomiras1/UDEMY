```html
<!-- caso: Acordeón cerrado-->
<z-accordion
    [isOpen]="false">
    <!-- Contenido que agreguemos al titulo del acordeon, con el estilo y tamaño que se desee. -->
     <div headerTitle>
        <p class="z-highlight-2">Title 1</p>
     </div>
    <!-- Contenido que agreguemos al contenido del acordeón, respetando diseño propuesto. -->
    <p class="z-body-text padding-bottom-24">
      Contenido 01    
    </p>
</z-accordion>

<!-- caso: Acordeón abierto-->
<z-accordion
    [isOpen]="true">
    <div headerTitle>
        <p class="z-highlight-2">Title 1</p>
     </div>
    <!-- Contenido que agreguemos al contenido del acordeón, respetando diseño propuesto.
    El acordeón esta preparado para recibir otros componentes como contenido de ser necesario -->
    <z-button [text]="text">
    </z-button>

</z-accordion>
```
