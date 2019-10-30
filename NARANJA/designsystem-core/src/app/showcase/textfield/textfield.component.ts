import { Component, Inject, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { Documentation } from './documentation.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FORMS_CUSTOM_VALIDATORS } from '../../../lib/src/utils/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dsn-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {
  title = 'ds-naranja';
  description = 'Los textfields permiten a los usuarios ingresar y editar texto.';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/textfield';
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };

  nameIcon = 'icon-hide-pass';
  typePassword = 'password';
  disabledTextfieldCheckbox = false;

  checkbox = { id: 1, disabled: false, selected: false, indeterminate: false, text: 'Sin numero' };

  private submit: Subject<boolean> = new Subject();
  submit$ = this.submit.asObservable();

  private statusMoment: Subject<boolean> = new Subject();
  statusMoment$ = this.statusMoment.asObservable();

  private submitMultiple: Subject<boolean> = new Subject();
  submitMultiple$ = this.submitMultiple.asObservable();

  private submitPassword: Subject<boolean> = new Subject();
  submitPassword$ = this.submitPassword.asObservable();

  private validationMoment: Subject<any> = new Subject();
  public validationMoment$ = this.validationMoment.asObservable();

  public regExpList = [
    {
      id: 1,
      message: 'Ingresar una mayúscula',
      regExp: /[A-Z]+/g,
      validate: false
    },
    {
      id: 2,
      message: 'Ingresar un número',
      regExp: /[0-9]/g,
      validate: false
    },
    {
      id: 3,
      message: 'Ingresar una minúscula',
      regExp: /[a-z]+/g,
      validate: false
    },
    {
      id: 4,
      message: 'Ingresar entre 8 y 16 caracteres',
      regExp: /\b[a-zA-Z0-9!"#$%&/()=?¡¨*\[\].:;,-_]{8,16}\b/g,
      validate: false
    }
  ];

  public showCustomValidation = true;

  public count = 0;
  public menssagesErrorMultiple: string;
  public arrayTypes = [{ name: 'maxLength' }, { name: 'minLength' }, { name: 'number' }];
  public documentation: Documentation;

  public formTextfield: FormGroup;
  constructor(@Inject(FORMS_CUSTOM_VALIDATORS) private customValidators: any, private http: HttpClient) {
    this.submitMultiple = new Subject();
  }

  public flagDefault = false;
  public flagDefaultOnFocus = false;
  public flagDefaultOnSubmit = false;
  public flagDefaultMultiError = false;
  public flagDefaultSuccess = false;
  public flagDefaultPass = false;
  public flagDefaultDisabled = false;
  public flagDefaultSuccessOnFocus = false;
  public flagDefaultCheckbox = false;
  public flagDefaultPhoneNumber = false;
  public flagDefaultEmail = false;

  ngOnInit() {
    this.createForm();
    this.documentation = new Documentation();

    this.formTextfield.get('password').statusChanges.subscribe(() => {
      this.validationMoment.next(true);
    });
  }

  createForm() {
    this.formTextfield = new FormGroup({
      default: new FormControl(''),
      defaultName: new FormControl(''),
      defaultDni: new FormControl('', this.customValidators.number),
      onFocusNumberCard: new FormControl('', this.customValidators.number),
      onFocusDni: new FormControl('', this.customValidators.number),
      onSubmitNumberCard: new FormControl('', this.customValidators.number),
      onSubmitDni: new FormControl('', this.customValidators.number),
      multipleerrorMonto: new FormControl('', Validators.compose([this.customValidators.number, this.customValidators.maxValue(100)])),
      successNumberCard: new FormControl('', Validators.compose([this.customValidators.number, this.customValidators.minlength(16),
        this.customValidators.maxlength(16)])),
      successNumberCard1: new FormControl('', Validators.compose([this.customValidators.number, this.customValidators.minlength(16),
        this.customValidators.maxlength(16)])),
      checkboxNumberDom: new FormControl('', this.customValidators.number),
      password: new FormControl(''),
      email: new FormControl('', Validators.compose([this.customValidators.email])),
      phoneNumber: new FormControl('', Validators.compose([
        this.customValidators.number, this.customValidators.minlength(8),
        this.customValidators.maxlength(10), this.customValidators.phone])),
      phoneNumberPrefixs: new FormControl('', Validators.compose([
        this.customValidators.number, this.customValidators.minlength(8),
        this.customValidators.maxlength(10), this.customValidators.phone])),
      dateNormal: new FormControl(''),
      numberCard: new FormControl('')
    });
  }

  onClickSubmit() {
    this.submit.next(true);
  }

  handlerErrorEvent(event) {
    if (event[0]) {
      this.submit.next(false);
    }
  }

  onClickSubmitMultiple() {
    this.submitMultiple.next(true);
  }

  onClickIngresarPassword() {
    this.submitPassword.next(true);
  }

  handlerErrorEventMultiple(event) {
    if (event[0]) {
      if (event[0] !== 'success') {
        this.count = this.count + 1;
        if (this.count === 3) {
          this.menssagesErrorMultiple = `Ingreso mas de ${this.count} veces mal. `;
        }
      } else {
        this.count = 0;
        this.menssagesErrorMultiple = '';
      }
      this.submit.next(false);
    }
  }

  clickEventIconPass(event) {
    if (event && this.nameIcon === 'icon-hide-pass') {
      this.nameIcon = 'icon-show-pass';
      this.typePassword = 'text';
      return;
    }
    if (event && this.nameIcon === 'icon-show-pass') {
      this.nameIcon = 'icon-hide-pass';
      this.typePassword = 'password';
      return;
    }
  }

  checkSelected() {
    this.checkbox.selected = !this.checkbox.selected;
    this.disabledTextfieldCheckbox = !this.disabledTextfieldCheckbox;
    if (this.disabledTextfieldCheckbox) {
      this.formTextfield.get('checkboxNumberDom').disable();
    } else {
      this.formTextfield.get('checkboxNumberDom').enable();
    }
    this.formTextfield.get('checkboxNumberDom').reset();
  }

  handleControlCustom(event) {
    if (event && event.focusOut) {
      this.validationMoment.next(event);
      this.validationCustom(event);
    }

    for (const element of this.regExpList) {
      if (element.id === event.id && event.validate) {
        element.validate = event.validate;
      }
    }
    this.validationCustom();
  }

  handleControlCustomPhone(event) {
    console.log('Event: ', event);
  }

  validationCustom(response?) {
    if (this.regExpList) {
      for (const element of this.regExpList) {
        if (!element.validate) {
          this.showCustomValidation = true;
          return false;
        }
      }
      if (response && response.focusOut) {
        this.showCustomValidation = false;
      }
    }
    return true;
  }
}
