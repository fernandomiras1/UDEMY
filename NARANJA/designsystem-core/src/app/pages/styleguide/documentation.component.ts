export class Documentation {
  public checkbox =
    `<div>
   <label class="z-chbx">
      <input type="checkbox"/>
      <span class="checkbox-icon"></span>
      <span class="checkbox-label">Ejemplo</span>
   </label>
</div>`;

  public slider =
    `<div>
<input type="range" class="z-slider" min="1" max="100" value="1"/>
</div>`;

  public radio =
    `<div>
  <label class="z-radio">
    <input type="radio" name="radio-group"/>
    <span class="radio-icon"></span>
    <span class="radio-label">Ejemplo</span>
  </label>
</div>`;

  public select =
    `<div>
<div class="z-select">
<select class="select-box">
  <option hidden>Placeholder</option>
  <option>Ejemplo 1</option>
  <option>Ejemplo 2</option>
  <option>Ejemplo 3</option>
</select>
<i class="icon-angle-down icon-select size-16"></i>
 </div>
</div>`;

  public button =
    `<button class="z-button-primary ripple-white">Boton</button>`;

  public switch =
    `<label class="z-switch-html">
  <input type="checkbox"/>
  <span class="switch-icon"></span>
  <span class="switch-label">Ejemplo</span>
</label>`;

  public snackbar =
    `<div class="z-snack">
  <label class="texto-snack">Texto del Snackbar.</label>
  <div class="acciones-snack">
    <a class="link-snack">Link del Snackbar</a>
    <i class="icon-cross icono-snack size-16"></i>
  </div>
</div>`;

  public alert =
    `<div class="z-alert z-alert__success">
    <div class="icon icono-alert">
      <i class="icon-check-circle size-24"></i>
    </div>
    <label class="texto-alert">Texto del Alert.</label>
  </div>`;

  public card =
    `<div class="z-card-html ripple-card">
  <div class="card-content">
   <p>Texto de la card.</p>
    </div>
</div>`;

  public chip =
    `<div>
<label class="z-chip ">
   <input type="radio" name="radio-group"/>
    <span class="ripple-chip"><p class="chip-text">$50</p></span>
</label>
</div>`;

  public list =
    `<div>
 <ul>
<li class="z-list-html z-list-html__li-texto">
<div class="z-list-html__li-texto__primary">
<p>Texto de ejemplo</p>
<p class="z-list-html__li-texto__sub-title">Secundario</p>
</div>
<div class="z-list-html__li-texto__secondary">
<p>$200</p>
<p class="z-list-html__li-texto__sub-title">-$135,50</p>
   </div>
  </li>
</ul>
</div>`;

  public table =
    `<table class="z-table">
<tr class="tr-header">
<th >Columna 1</th>
  <td>Columna 2</td>
</tr>
 <tr class="tr-content">
  <th>Ejemplo</th>
   <td>Ejemplo</td>
</tr>
<tr class="tr-content">
<td>Ejemplo</td>
 <td>Ejemplo</td>
 </tr>
</table>`;

  public avatar =
    `<div class="z-avatar-html">
 <div class="z-avatar-html__icon z-avatar-html__large">
  <div class="icon"><p class="icon-user size-24"></p></div>
  </div>
 </div>`;

}
