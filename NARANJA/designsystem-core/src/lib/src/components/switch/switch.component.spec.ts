import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZSwitchComponent, SwitchAlignType } from './switch.component';

describe('NGZSwitchComponent', () => {
  let component: NGZSwitchComponent;
  let fixture: ComponentFixture<NGZSwitchComponent>;
  const obj = { selected: false, text: 'prueba switch', disabled: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZSwitchComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should writeValue chip', () => {
    component.writeValue(obj);

    expect(component.switch).toBeTruthy();
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
    component.registerOnChange(obj);

    expect(component.registerOnChange).toBeTruthy();
  });

  it('should registerOnTouched', () => {
    component.registerOnTouched(obj);

    expect(component.registerOnTouched).toBeTruthy();
  });

  it('should switchSelected', () => {
    component.switch = obj;
    component.switchSelected();

    expect(component.switch.selected).toEqual(true);
  });

  it('should switchSelected when switch is disabled', () => {
    component.switch = obj;
    component.switch.disabled = true;
    component.switchSelected();

    expect(component.switch).toEqual(obj);
  });

  it('should set right align', () => {
    component.type = SwitchAlignType.RIGHT;
    expect(component.typeSwitchAlign).toEqual({ 'padding-right': '8px', order: 0 });
  });

  it('should set left align', () => {
    component.type = SwitchAlignType.LEFT;
    expect(component.typeSwitchAlign).toEqual({ 'padding-left': '8px', order: 1 });
  });

  it('should set right align default', () => {
    component.type = null;
    expect(component.typeSwitchAlign).toEqual({ 'padding-right': '8px', order: 0 });
  });
});
