import { BehaviorSubject, Subject } from 'rxjs';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'dsn-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  description = 'Estos son ejemplos de algunos formularios que usamos en Naranja. Están disponibles para tomar como base en cuanto a estructura, funcionamiento y estilo.';
  link = '';
  text = 'Continuar';

  isLoading = false;
  isLoadingEdit = false;

  styleArrayForm = { padding: '40px' };

  public momentOfValidate = 'outFocus';
  public momentOfValidateEdit = 'outFocus';

  private submit: Subject<boolean> = new Subject();
  submit$ = this.submit.asObservable();

  items = [
    { id: 1, text: 'Lunes', disabled: false },
    { id: 2, text: 'Martes', disabled: false },
    { id: 3, text: 'Miércoles', disabled: false },
    { id: 4, text: 'Jueves', disabled: false },
    { id: 5, text: 'Viernes', disabled: false }
  ];
  itemsFilter = [];
  item: any;

  public submitEdit: BehaviorSubject<boolean>;

  public form: FormGroup;

  public model = {
    name: '',
    lastName: '',
    email: '',
    phone: ''
  };

  varError = '';

  constructor() {
    this.submit = new BehaviorSubject<boolean>(null);
    this.submitEdit = new BehaviorSubject<boolean>(null);
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.itemsFilter = this.items;
    this.item = null;
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.model.name),
      lastName: new FormControl(this.model.lastName),
      email: new FormControl(this.model.email),
      phone: new FormControl(this.model.phone),
      select: new FormControl('')
    });
  }

  createModel() {
    this.model.name = this.form.get('name').value;
    this.model.lastName = this.form.get('lastName').value;
    this.model.email = this.form.get('email').value;
    this.model.phone = this.form.get('phone').value;
  }

  error(event) {
    if (event[0] === 'pattern') {
      this.varError = 'asdasd';
    }
  }

  onClickPrimaryWithSpinner() {
    this.momentOfValidate = 'submit';
    this.submit.next(true);

    if (this.form.valid && this.form.dirty) {
      this.createModel();
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    },         3000);
  }

  onClickPrimaryWithSpinnerEditDatos() {
    this.momentOfValidateEdit = 'submit';
    this.submitEdit.next(true);

    this.isLoadingEdit = true;
    setTimeout(() => {
      this.isLoadingEdit = false;
    },         3000);
  }

  itemSelected(event) {
    this.item = event;
    this.form.get('select').setValue(event.text);
  }

  handlerError(event) {
    if (this.item === null || this.form.get('select').value !== this.item.text) {
      this.form.get('select').setValue('');
      this.item = null;
      this.submit.next(false);
    }
  }
}
