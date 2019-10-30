import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZCheckboxComponent } from './checkbox.component';
import { NGZContainerCheckboxsComponent } from '../checkboxs.component';

describe('NGZCheckboxComponent', () => {
  let component: NGZCheckboxComponent;
  let fixture: ComponentFixture<NGZCheckboxComponent>;
  const checkboxDisabled = { id: 1, disabled: true, selected: false };
  const checkbox = { id: 1, disabled: false, selected: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZCheckboxComponent, NGZContainerCheckboxsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should checked checkbox when is disabled', () => {
    component.checkbox = checkboxDisabled;
    component.checkSelected(new Event('click'));

    expect(component.checkboxChecked.emit).toBeTruthy();
  });

  it('should checked checkbox', () => {
    component.checkbox = checkbox;
    component.checkSelected(new Event('click'));

    expect(component.checkboxChecked.emit).toBeTruthy();
  });

  it('should writeValue list', () => {
    component.writeValue(checkboxDisabled);

    expect(component.checkbox).toEqual(checkboxDisabled);
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
    component.registerOnChange(checkboxDisabled);

    expect(component.registerOnChange).toBeTruthy();
  });

  it('should registerOnTouched', () => {
    component.registerOnTouched(checkboxDisabled);

    expect(component.registerOnTouched).toBeTruthy();
  });
});
