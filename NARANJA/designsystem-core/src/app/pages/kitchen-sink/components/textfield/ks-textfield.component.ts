import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { FORMS_CUSTOM_VALIDATORS } from '../../../../../lib/src/utils/forms';

@Component({
  selector: 'dsn-kstextfield',
  templateUrl: './ks-textfield.component.html',
  styleUrls: ['./ks-textfield.component.scss']
})
export class KsTextfieldComponent implements OnInit {

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

  public formTextfield: FormGroup;
  constructor(@Inject(FORMS_CUSTOM_VALIDATORS) private customValidators: any, private http: HttpClient) {
    this.submitMultiple = new Subject();
  }

  ngOnInit() {
    this.createForm();

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
      email: new FormControl('', Validators.compose([this.customValidators.email]))
    });
  }

  clickDeleteData(event) {
    this.formTextfield.get('defaultName').setValue(null);
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
