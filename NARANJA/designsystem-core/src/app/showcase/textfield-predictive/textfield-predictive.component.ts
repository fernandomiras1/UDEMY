import { Documentation } from './documentation.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'dsn-textfield-predictivo',
  templateUrl: './textfield-predictive.component.html',
  styleUrls: ['./textfield-predictive.component.scss']
})
export class TextfieldPredictiveComponent implements OnInit, AfterViewInit {
  title = 'ds-naranja';
  description = 'Los textfields predictivos permiten a los usuarios realizar busquedas en una lista de opciones.';
  link = '';
  info = {
    status: 'beta',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };

  formTextfieldPredictive: FormGroup;

  public documentation: Documentation;

  public flagDefault = false;
  public flagDefaultDemo = false;

  items = [
    { id: 1, text: 'Lunes', disabled: false },
    { id: 2, text: 'Martes', disabled: false },
    { id: 3, text: 'Miércoles', disabled: false },
    { id: 4, text: 'Jueves', disabled: false },
    { id: 5, text: 'Viernes', disabled: false }
  ];
  itemsDefault = [
    { id: 1, text: 'Lucas Dimattia', disabled: false },
    { id: 2, text: 'Lucas Cargnelutti', disabled: false },
    { id: 3, text: 'Lucas Conci', disabled: true },
    { id: 4, text: 'Marcos P', disabled: false },
    { id: 5, text: 'Fernando M', disabled: true },
    { id: 6, text: 'Alfredo B', disabled: false },
    { id: 7, text: 'Kevin R', disabled: false },
    { id: 8, text: 'Mauro', disabled: false },
    { id: 9, text: 'Joaquin', disabled: false }
  ];

  itemsFilter = [];
  itemsFilterDefault = [];
  item: any;
  itemDefault: any;

  private submit: Subject<boolean> = new Subject();
  submit$ = this.submit.asObservable();
  private submitDefault: Subject<boolean> = new Subject();
  submitDefault$ = this.submitDefault.asObservable();

  constructor() {
    this.documentation = new Documentation();
  }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  createForm() {
    this.formTextfieldPredictive = new FormGroup({
      select: new FormControl(''),
      selectDefault: new FormControl(''),
      selectDisabled: new FormControl('')
    });
  }

  itemSelected(event) {
    this.item = event;
    this.formTextfieldPredictive.get('select').setValue(event.text);
    this.itemsFilter = this.items;
  }

  handlerError(event) {
    if (this.item === undefined) {
      this.item = null;
    }
  }

  // segundo textfield predictivo

  itemSelectedDefault(event) {
    this.itemDefault = event;
    this.formTextfieldPredictive.get('selectDefault').setValue(event.text);
    this.itemsFilterDefault = this.itemsDefault;
  }

  handlerErrorDefault(event) {
    if (this.itemDefault === null) {
      this.itemDefault = null;
    }
  }
}
