import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'dsn-kspredictivetextfield',
  templateUrl: './ks-textfield-predictive.component.html',
  styleUrls: ['./ks-textfield-predictive.component.scss']
})
export class KsPredictiveTextfieldComponent implements OnInit {
  formTextfieldPredictive: FormGroup;

  items = [
    { id: 1, text: 'Label 01', disabled: false },
    { id: 2, text: 'Label 02', disabled: false },
    { id: 3, text: 'Label 03', disabled: false },
    { id: 4, text: 'Label 04', disabled: false },
    { id: 5, text: 'Label 05', disabled: false }
  ];

  itemsFilter = [];
  item: any;

  private submit: Subject<boolean> = new Subject();
  submit$ = this.submit.asObservable();

  constructor() {
  }

  ngOnInit() {
    this.itemsFilter = this.items;
    this.item = null;
    this.createForm();
    this.formTextfieldPredictive.get('select').statusChanges.subscribe((data) => {
      if (data === 'INVALID') { return; }
      const aux = [];
      let text = '';
      if (this.formTextfieldPredictive.get('select').value) {
        text = this.formTextfieldPredictive.get('select').value.toLowerCase();
      }
      const searchText = this.normalizeText(text);
      this.items.filter((item) => {
        if (this.normalizeText(item.text).indexOf(searchText) !== -1) {
          aux.push(item);
        }
      });
      this.itemsFilter = aux;
    });
  }

  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, '$1$2')
      .normalize().toLowerCase();
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
    if (this.item === null || this.formTextfieldPredictive.get('select').value !== this.item.text) {
      this.formTextfieldPredictive.get('select').setValue(null);
      this.item = null;
      this.submit.next(false);
    }
  }

  itemSelectedDefault(event) {
    this.item = event;
    this.formTextfieldPredictive.get('selectDefault').setValue(event.text);
    this.itemsFilter = this.items;
  }

  handlerErrorDefault(event) {
    if (this.item === null || this.formTextfieldPredictive.get('selectDefault').value !== this.item.text) {
      this.formTextfieldPredictive.get('selectDefault').setValue(null);
      this.item = null;
      this.submit.next(false);
    }
  }
}
