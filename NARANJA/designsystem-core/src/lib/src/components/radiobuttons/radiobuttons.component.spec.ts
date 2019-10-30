import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZContainerRadiobuttonsComponent } from './radiobuttons.component';
import { NGZRadiobuttonComponent } from './radiobutton/radiobutton.component';

describe('NGZRadiobuttonsComponent', () => {
  let component: NGZContainerRadiobuttonsComponent;
  let fixture: ComponentFixture<NGZContainerRadiobuttonsComponent>;
  const listRadioButtons = [{ id: 1, disabled: true, selected: false },
    { id: 1, disabled: false, selected: true, text: '$500' },
    { id: 1, disabled: false, selected: false, text: '$1.000' },
    { id: 3, disabled: false, selected: false, text: '$10.000' }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZContainerRadiobuttonsComponent, NGZRadiobuttonComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZContainerRadiobuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select radio', () => {
    const radio =  { id: 3, disabled: false, selected: true, text: '$10.000' };
    component.listRadioButtons = listRadioButtons;
    component.radioSelected(component.listRadioButtons.length - 1);

    expect(radio).toEqual(component.listRadioButtons[component.listRadioButtons.length - 1]);
  });

  it('should writeValue list', () => {
    component.writeValue(listRadioButtons);

    expect(component.listRadioButtons).toEqual(listRadioButtons);
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
    component.registerOnChange(listRadioButtons);

    expect(component.registerOnChange).toBeTruthy();
  });

  it('should registerOnTouched', () => {
    component.registerOnTouched(listRadioButtons);

    expect(component.registerOnTouched).toBeTruthy();
  });
});
