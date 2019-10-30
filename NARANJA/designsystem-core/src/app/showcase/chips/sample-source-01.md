```html
<!-- caso: Con ngModel-->
<z-chips [(ngModel)]="listChips"
         [defaultIndexSelected]="4">
</z-chips>

<!-- caso: Con Form-->
<div [formGroup]="form">
  <z-chips formControlName="chip">

  </z-chips>
</div>

<!-- caso: con Input -->
<z-chips [listChips]="listChips" 
         [defaultIndexSelected]="3">

</z-chips>

<!-- caso: con Type radio -->
<z-chips [listChips]="listChips" 
         [type]="'radio'">

</z-chips>

<!-- caso: con Type Checkbox -->
<z-chips [listChips]="listChips" 
         [type]="'checkbox'">

</z-chips>

```
```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dsn-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {
  public form: FormGroup;
  public listChips: any[] = [
        { id: 1, disabled: false, selected: true, text: 'Chip 312312311' },
        { id: 2, disabled: false, selected: false, text: 'Plan z' },
        { id: 3, disabled: true, selected: false, text: 'Plan z' },
        { id: 4, disabled: false, selected: false, text: 'Plan 339/234' }
      ];
  
  ngOnInit() {
     this.createForm();
  }
  
  createForm(): void {
    this.form = new FormGroup({
      chip: new FormControl(this.listChips)
    });
  }

}
```
