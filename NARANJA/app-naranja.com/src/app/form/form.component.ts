import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  protected aFormGroup: FormGroup;
  public data: any;
  public aseguradora: boolean;
  public error: boolean;
  public success: boolean;
  public invalidForm: boolean;
  public sending: boolean;
  public send: boolean;
  public isModalOpen: boolean;
  public modalType: any;

  // Captcha Key
  siteKey = '6LcNx6sUAAAAAL5d0oN24Waeahb48LOhh2XsbJk5';
  token;
  myForm: FormGroup;
  selectedSegurosName = [];
  regexEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  private readonly isBrowser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.isModalOpen = false;
    this.createForm();
  }

  createForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])],
      dni: ['', Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(9)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.regexEmail)
      ])],
      areaCode: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(5),
      ])],
      cel: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(9),
      ])]
    });

    // Si tiene aseguradoras, armo los checkboxes
    // if (this.data.aseguradora !== undefined) {
    //   this.aseguradora = true;
    //   if (this.data.aseguradora.length > 0) {
    //     this.addCheckboxes(this.data.aseguradora);
    //   }
    // }

  }

  getErrorMessage(formError?: any): string {

    let validatorName: string;
    const messages: any = {
      required: 'El campo es requerido',
      alphanumber: 'Ingresar sólo letras y/o números',
      number: 'Ingresar sólo números',
      email: 'El email es inválido',
      pattern: 'El email es inválido',
      phone: `Teléfono inválido`,
      dni: `El DNI ingresado es inválido`
    };

    if (formError) {
      messages.maxlength = (formError.maxlength) ? `No superar los ${formError.maxlength.requiredLength} caracteres` : '';
      messages.minlength = (formError.minlength) ? `Ingresar al menos ${formError.minlength.requiredLength} caracteres` : '';
    }

    for (const m in messages) {
      if (formError[m]) {
        validatorName = m;
        break;
      }
    }

    return messages[validatorName];
  }

  // Arma los checkbox de manera dinámica, dependiendo las aseguradoras que tenga el form de contentful
  private addCheckboxes(aseguradoras) {
    aseguradoras.map((o, i) => {
        const control = new FormControl(); // Agrego un checkbox por cada aseguradora.
        (this.myForm.controls.aseguradora as FormArray).push(control);
    });
  }

  public numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  submit = async () => {
    // let aseguradoras = [];

    // Busca los valores que ingresó el usuario
    const name = this.myForm.get('name').value;
    const lastName = this.myForm.get('lastName').value;
    const dni = this.myForm.get('dni').value;
    const email = this.myForm.get('email').value;
    const areaCode = this.myForm.get('areaCode').value;
    const cel = this.myForm.get('cel').value;

    // aseguradoras = [...this.selectedSegurosName, ...this.formService.getDefaultEmails(this.data.aseguradora)];

    if (this.myForm.valid) {
      this.invalidForm = false;
      this.sending = true;
      console.log('es valido el formulario');
      // this.reCaptchaV3Service.execute(this.siteKey, 'homepage', async (token) => {

      //   // Send Email.
      //   const response = await this.sendGrid.sendEmail(name, lastName, dni, areaCode, cel, email, aseguradoras, token);
      //   if (<any>(response)  > 400) {
      //     this.modalType = 'error';
      //     this.isModalOpen = true;
      //     this.resetForm();
      //   } else {
      //     this.modalType = 'success';
      //         this.isModalOpen = true;
      //         this.resetForm();
      //   }
      // });
    } else {
      this.validateAllFormFields(this.myForm);
    }
  }


  // Por cada cambio en los checkbox se ejecuta esta función. Alamceno los nombres de los campos seleccionados.
  getselectedSegurosName = () => {
    // this.selectedSegurosName = this.formService.getSelectedSeguroName(this.checkboxGroup.controls, this.data.aseguradora);
  }

  public validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  blur(event: any) {
    if (this.isBrowser) {
      if (event.target.value && event.target.value.length > 0) {
        event.target.parentElement.classList.add('active');
      } else {
        event.target.parentElement.classList.remove('active');
      }
    }
  }

  resetForm() {
    this.myForm.reset();
    this.sending = false;
    if (this.isBrowser) {
      const inputs = document.getElementsByClassName('seguros-y-asistencia__input-field');
      for (const items of inputs as any) {
        items.classList.remove('active');
      }
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  get email() {
    return this.myForm.get('email');
  }

  get name() {
    return this.myForm.get('name');
  }

  get lastName() {
    return this.myForm.get('lastName');
  }

  get dni() {
    return this.myForm.get('dni');
  }

  get areaCode() {
    return this.myForm.get('areaCode');
  }

  get cel() {
    return this.myForm.get('cel');
  }

}
