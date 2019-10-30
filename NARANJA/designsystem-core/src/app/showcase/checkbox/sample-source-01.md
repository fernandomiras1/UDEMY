```html
<!-- caso: Con ngModel-->
<z-checkboxs [(ngModel)]="listCheckboxs">
</z-checkboxs>

<!-- caso: Con Form-->
<div [formGroup]="form">
  <z-checkboxs formControlName="checkboxs">

  </z-checkboxs>>
</div>

<!-- caso: con Input -->
<z-checkboxs [listCheckboxs]="listCheckboxs">

</z-checkboxs>

```
```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dsn-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  public form: FormGroup;
  public listCheckboxs = [{id: 1, disabled: false, selected: false, indeterminate: false, text: 'Todas',
        listCheckboxs: [
          { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Naranja' },
          { id: 1, disabled: false, selected: false, indeterminate: false, text: 'VISA' },
          { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Mastercard' },
          { id: 1, disabled: false, selected: false, indeterminate: false, text: 'American Express' }
        ]}];
  ngOnInit() {
     this.createForm();
  }
  
  createForm(): void {
    this.form = new FormGroup({
      checkboxs: new FormControl(this.listCheckboxs)
    });
  }

}
```
