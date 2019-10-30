```html
 <div [formGroup]="form">
    <z-card [isNotHover]="true" [clickable]="false" [styleList]="styleArrayForm">
        <div class="row">
        <div class="col-md-12">
            <title class="card-title z-title">Averiguá sin compromiso</title>
        </div>
        </div>
        <div class="row">
        <div class="col-lg-6 col-md-6 col-xs-12">
            <h2 class="card-subtitle">Completá este formulario y mirá en el acto que tarjetas y límites podrías tener.
            Después podés decidir si las querés</h2>
        </div>
        <div class="col-lg-6 col-md-6 col-xs-12"></div>
        </div>
        <div class="row">
        <div class="col-lg-6 col-md-6 col-xs-12 margin-container">
            <z-textfield 
              text="Nombre" 
              [id]="'name'" 
              [formControl]="form.get('name')" 
              [momentOfValidate]="momentOfValidate"
              [submit$]="submit">
            </z-textfield>
        </div>
        <div class="col-lg-6 col-md-6 col-xs-12 margin-container">
            <z-textfield
              text="Apellido"
              [id]="'lastName'"
              [formControl]="form.get('lastName')" 
              [momentOfValidate]="momentOfValidate" 
              [submit$]="submit">
            </z-textfield>
        </div>
        </div>
        <div class="row">
        <div class="col-lg-6 col-md-6 col-xs-12 margin-container">
            <z-textfield 
              text="Email" 
              [formControl]="form.get('name')" 
              [id]="'email'" 
              [momentOfValidate]="momentOfValidate"
              [submit$]="submit">
            </z-textfield>
        </div>
        <div class="col-lg-6 col-md-6 col-xs-12 margin-container">
            <z-textfield
              text="Celular"
              [formControl]="form.get('phone')"
              [id]="'phone'"
              name="phone"
              [momentOfValidate]="momentOfValidate"
              [submit$]="submit">
            </z-textfield>
        </div>
        </div>
        <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <div class="button-container">
            <z-button 
              class="button-primary" 
              (clickButton)="onClickPrimary()" 
              [text]="'Enviar'">
            </z-button>
            </div>
        </div>
        </div>
    </z-card>
</div>
```
```typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FORMS_CUSTOM_VALIDATORS } from 'zumo';

@Component({
  selector: 'dsn-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnInit {
    public form: FormGroup;

    public model = {
        name: '',
        lastName: '',
        email: '',
        phone: ''
    };

    constructor(@Inject(FORMS_ERROR_MESSAGES) private customValidators: any) {}

    ngOnInit() {
       this.createForm();
    }

    createForm() {
        this.formCargaDatos = new FormGroup({
            name: new FormControl(''),
            lastName: new FormControl(''),
            email: new FormControl('', this.customValidators.email),
            phone: new FormControl('')
        });
    }

    onClickPrimary() {
        this.momentOfValidate = 'submit';
        this.submit.next(true);

        if (this.form.valid && this.form.dirty) {
           this.createModel();
        }
    }
    createModel() {
        this.model.name = this.form.get('name').value;
        this.model.lastName = this.form.get('lastName').value;
        this.model.email = this.form.get('email').value;
        this.model.phone = this.form.get('phone').value;
    }
}
```