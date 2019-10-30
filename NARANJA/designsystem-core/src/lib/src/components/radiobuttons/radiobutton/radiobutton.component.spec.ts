import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZRadiobuttonComponent } from './radiobutton.component';
import { FormsModule } from '@angular/forms';

describe('NGZRadiobuttonComponent', () => {
  let component: NGZRadiobuttonComponent;
  let fixture: ComponentFixture<NGZRadiobuttonComponent>;
  const radio = { disabled: false, selected: false, text: ' ' };
  const radioDisabled = { disabled: true, selected: false, text: ' ' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZRadiobuttonComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZRadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should writeValue radioButton', () => {
    component.writeValue(radio);

    expect(component.radiobutton).toBeTruthy();
  });

  it('should writeValue null', () => {
    component.writeValue(null);

    expect(component.writeValue).toBeTruthy();
  });

  it('should setDisabledState', () => {
    component.setDisabledState(true);

    expect(component.setDisabledState).toBeTruthy();
  });

  it('should registerOnChange', () => {
    component.registerOnChange(radio);

    expect(component.registerOnChange).toBeTruthy();
  });

  it('should registerOnTouched', () => {
    component.registerOnTouched(radio);

    expect(component.registerOnTouched).toBeTruthy();
  });

  it('should checkRadioButton', () => {
    component.radiobutton = radio;
    component.checkRadioButton();

    expect(component.radioSelected).toBeTruthy();
  });

  it('should checkRadioButton when is disabled', () => {
    component.radiobutton = radioDisabled;
    component.checkRadioButton();

    expect(component.radiobutton.disabled).toEqual(true);
  });
});
