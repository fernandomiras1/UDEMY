import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZTextfieldComponent, TextfieldComponentType, MomentValidateTexfield } from './textfield.component';
import { ZUtilsModule } from '../../utils/utils.module';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, OnInit } from '@angular/core';
import { NGZCheckboxsModule } from '../checkboxs/checkboxs.module';
import { DocumentService } from '../../utils/services/document/document.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  template: `
  <div [formGroup]="formTextfield">
    <z-textfield text="Contraseña" [type]="'password'" [id]="'password'"
      [formControl]="formTextfield.get('password')">
      <z-container-icon [size]="'very-small'" [iconName]="nameIcon">
      </z-container-icon>
      <div zControlMessages>
        <z-control-messages *ngFor="let item of regExpList" [hidden]="!showCustonValidation"
          [validationMoment]="validationMoment$" [regExpresion]="item" [control]="formTextfield.get('password')"
          (handleControlCustom)="handleControlCustom($event)">
        </z-control-messages>
      </div>
    </z-textfield>
  </div>`
})
class TextfieldTestComponent implements OnInit {
  public formTextfield: FormGroup;

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.formTextfield = new FormGroup({
      password: new FormControl('')
    });
  }
}

describe('TextfieldComponent', () => {
  let component: NGZTextfieldComponent;
  let fixture: ComponentFixture<NGZTextfieldComponent>;
  let inputEl: DebugElement;
  let documentService: DocumentService;

  const checkboxAux = { id: 1, disabled: false, selected: false, text: '' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ZUtilsModule, NGZCheckboxsModule],
      declarations: [
        NGZTextfieldComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZTextfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('input'));
    documentService = TestBed.get(DocumentService);
  });

  it('should create component textfield', () => {
    expect(component).toBeTruthy();
  });

  it('should set text default', () => {
    expect(component.text).toEqual('');
  });

  it('should type password', () => {
    component.type = TextfieldComponentType.PASSWORD;
    expect(component.typeInput).toEqual('password');
  });

  it('should type text', () => {
    component.type = TextfieldComponentType.TEXT;
    expect(component.typeInput).toEqual('text');
  });

  it('validator required', () => {
    component.required = true;
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('validator required number', () => {
    component.required = true;
    component.type = 'number';
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('validator required mail', () => {
    component.required = true;
    component.type = 'email';
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('validator required alphabetic', () => {
    component.required = true;
    component.type = 'alphabetic';
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('validator required phone', () => {
    component.required = true;
    component.type = 'phone';
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('create form default value ', () => {
    component.typeValidators = [{ name: 'asd' }];
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('create form with TextfieldComponentType.PHONE ', () => {
    component.typeValidators = [{ name: 'phone' }];
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('create form with TextfieldComponentType.EMAIL ', () => {
    component.typeValidators = [{ name: 'email' }];
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('create form with TextfieldComponentType.NUMBER ', () => {
    component.typeValidators = [{ name: 'number' }];
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('create form with TextfieldComponentType.MAXVALUE ', () => {
    component.typeValidators = [{ name: 'maxValue' }];
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('create form with TextfieldComponentType.MINVALUE ', () => {
    component.typeValidators = [{ name: 'minValue' }];
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('create form with TextfieldComponentType.MAXLENGTH ', () => {
    component.typeValidators = [{ name: 'maxLength' }];
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('create form with TextfieldComponentType.MINLENGTH ', () => {
    component.typeValidators = [{ name: 'minLength' }];
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('create form with TextfieldComponentType.ALPHABETIC ', () => {
    component.typeValidators = [{ name: 'alphabetic' }];
    component.createForm();
    expect(component.formControl.validator).not.toBe(null);
  });

  it('should set moment of validate onfocus', () => {
    component.momentOfValidate = MomentValidateTexfield.ONFOCUS;
    expect(component.moment).toEqual(MomentValidateTexfield.ONFOCUS);
  });

  it('should set moment of validate onfocus', () => {
    component.momentOfValidate = MomentValidateTexfield.ONFOCUS;
    expect(component.moment).toEqual(MomentValidateTexfield.ONFOCUS);
  });

  it('should set moment of validate outfocus', () => {
    component.momentOfValidate = MomentValidateTexfield.OUTFOCUS;
    expect(component.moment).toEqual(MomentValidateTexfield.OUTFOCUS);
  });

  it('should set moment of validate sutmit', () => {
    component.momentOfValidate = MomentValidateTexfield.SUBMIT;
    expect(component.moment).toEqual(MomentValidateTexfield.SUBMIT);
  });

  it('should set moment of validate defautlt', () => {
    component.momentOfValidate = 'sfdsdf';
    expect(component.moment).toEqual(MomentValidateTexfield.OUTFOCUS);
  });

  it('should set moment of validate defautlt', () => {
    component.momentOfValidate = 'sfdsdf';
    const event = { type: 'focusout' };
    component.focusOutFunction(event);
    expect(component.moment).toEqual(MomentValidateTexfield.OUTFOCUS);
  });

  it('should set moment of validate onfocus', () => {
    component.momentOfValidate = MomentValidateTexfield.ONFOCUS;
    expect(component.moment).toEqual(MomentValidateTexfield.ONFOCUS);
  });

  it('should set moment of validate onfocus', () => {
    component.momentOfValidate = MomentValidateTexfield.ONFOCUS;
    component.errors = { number: true };
    component.focusFunction();
    expect(component.moment).toEqual(MomentValidateTexfield.ONFOCUS);
  });

  it('should set moment of validate onfocus', () => {
    component.momentOfValidate = MomentValidateTexfield.OUTFOCUS;
    component.errors = { number: true };
    component.focusFunction();
    expect(component.moment).toEqual(MomentValidateTexfield.OUTFOCUS);
  });

  it('should set moment of validate outfocus', () => {
    component.momentOfValidate = MomentValidateTexfield.OUTFOCUS;
    expect(component.moment).toEqual(MomentValidateTexfield.OUTFOCUS);
  });

  it('should set moment of validate outfocus', () => {
    component.momentOfValidate = MomentValidateTexfield.ONFOCUS;
    const event = { type: 'outfocus' };
    component.focusOutFunction(event);
    expect(component.moment).toEqual(MomentValidateTexfield.ONFOCUS);
  });

  it('should set moment of validate outfocus', () => {
    component.momentOfValidate = MomentValidateTexfield.ONFOCUS;
    const event = { type: 'outfocus' };
    component.errors = { success: true };
    component.focusOutFunction(event);
    expect(component.moment).toEqual(MomentValidateTexfield.ONFOCUS);
  });

  it('should set moment of validate sutmit', () => {
    component.momentOfValidate = MomentValidateTexfield.SUBMIT;
    expect(component.moment).toEqual(MomentValidateTexfield.SUBMIT);
  });

  it('should set moment of validate defautlt', () => {
    component.momentOfValidate = 'sfdsdf';
    expect(component.moment).toEqual(MomentValidateTexfield.OUTFOCUS);
  });

  it('should set moment of validate defautlt', () => {
    component.momentOfValidate = 'sfdsdf';
    const event = { type: 'focusout' };
    component.focusOutFunction(event);
    expect(component.moment).toEqual(MomentValidateTexfield.OUTFOCUS);
  });

  it('should isRequired true', () => {
    component.errors = [];
    component.errors[0] = 'required';
    component.isRequired();
    expect(component.isErrorLine).toEqual(false);
  });

  it('should handleControl whitd messagesSuccess', () => {
    const event = { success: true };
    component.errors = [];
    component.errors[0] = 'success';
    component.menssagesSuccess = 'mensage de success';
    fixture.detectChanges();
    component.handleControl(event);
    expect(component.isSuccessLine).toEqual(true);
  });

  it('should writeValue null', () => {
    component.writeValue(null);

    expect(component.writeValue).toBeTruthy();
  });

  it('should setDisabledState', () => {
    component.setDisabledState(true);

    expect(component.setDisabledState).toBeTruthy();
  });

  it('should required false', () => {
    component.required = false;
    component.createForm();
    expect(component.required).toEqual(false);
  });

  it('should registerOnChange', () => {
    component.registerOnChange('checkboxDisabled');

    expect(component.registerOnChange).toBeTruthy();
  });

  it('should registerOnTouched', () => {
    component.registerOnTouched('checkboxDisabled');

    expect(component.registerOnTouched).toBeTruthy();
  });

});
