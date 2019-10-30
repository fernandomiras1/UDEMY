import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlMessagesComponent } from './control-messages.component';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators/custom-validators';
import { of } from 'rxjs';

describe('ControlMessagesComponent', () => {
  let component: ControlMessagesComponent;
  let fixture: ComponentFixture<ControlMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlMessagesComponent
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create error', () => {
    component.control = new FormControl('abc', Validators.compose([Validators.required, CustomValidators.number]));
    expect(component.errorMessage).toBe('Ingresar sólo números');
  });

  it('should create error', () => {
    component.control = new FormControl('abc', Validators.compose([Validators.required, CustomValidators.number]));
    expect(component.control.errors).toEqual({ number: true });
  });

  it('should custom validation', () => {
    component.regExpresion = {
      id: 1,
      message: 'Ingresar una mayúscula',
      regExp: /[A-Z]+/g,
      validate: false
    };
    const spy = spyOn(component, 'validationMoment').and.returnValue(of(true));
    fixture.detectChanges();
    component.ngOnInit();
    expect(spy).toBeTruthy();
  });

  it('should custom validation', () => {
    component.regExpresion = {
      id: 1,
      message: 'Ingresar una mayúscula',
      regExp: /[A-Z]+/g,
      validate: false
    };
    component.ngAfterContentInit();
    const spy = spyOn(component, 'validationMoment').and.returnValue(of(true));
    expect(spy).toBeTruthy();
  });

  it('should ngOnChanges', () => {
    component.alternativeError = 'asd';
    component.ngOnChanges();
    expect(component.message).toEqual('asd');
  });
});
