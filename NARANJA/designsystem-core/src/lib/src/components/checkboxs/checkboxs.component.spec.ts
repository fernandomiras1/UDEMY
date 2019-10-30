import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZContainerCheckboxsComponent } from './checkboxs.component';
import { NGZCheckboxComponent } from './checkbox/checkbox.component';

describe('NGZContainerCheckboxsComponent', () => {
  let component: NGZContainerCheckboxsComponent;
  let fixture: ComponentFixture<NGZContainerCheckboxsComponent>;
  const listCheckboxs = [{ id: 1, disabled: true, selected: false },
    { id: 1, disabled: false, selected: true, text: '$500', listCheckboxs: [{ id: 1, disabled: true, selected: false },
        { id: 1, disabled: false, selected: true, text: '$500' },
        { id: 1, disabled: true, selected: false, text: '$1.000', indeterminate: false },
      { id: 3, disabled: false, selected: false, text: '$10.000', listCheckboxs: [{ id: 1, disabled: true, selected: false },
            { id: 1, disabled: false, selected: true, text: '$500' },
            { id: 1, disabled: false, selected: false, text: '$1.000' },
            { id: 3, disabled: false, selected: false, text: '$10.000' }]  }] },
    { id: 1, disabled: true, selected: false, text: '$1.000', listCheckboxs: [] },
    { id: 3, disabled: false, selected: false, text: '$10.000' }];
  const listCheckboxs2 = [
    { id: 1, disabled: false, selected: false, indeterminate: false, listCheckboxs: [
      { id: 1, disabled: false, selected: true, text: '$500', indeterminate: false, listCheckboxs: [
        { id: 1, disabled: true, selected: true, text: '$500', indeterminate: false, listCheckboxs: [] }] },
      { id: 2, disabled: true, selected: false, text: '$500', indeterminate: false, listCheckboxs: [] },
      { id: 3, disabled: false, selected: false, text: '$500', indeterminate: false, listCheckboxs: [] }
    ] }];
  const listCheckboxs3 = [{ id: 1, disabled: false, selected: false, indeterminate: false, listCheckboxs: [
      { id: 1, disabled: true, selected: false, text: '$500', indeterminate: false, listCheckboxs: [] }]}];
  const listCheckboxs4 = [{ id: 1, disabled: false, selected: false, indeterminate: false, listCheckboxs: [
      { id: 1, disabled: false, selected: false, text: '$500', indeterminate: false, listCheckboxs: [] },
      { id: 1, disabled: false, selected: false, text: '$500', indeterminate: false, listCheckboxs: [] }]}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZContainerCheckboxsComponent, NGZCheckboxComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZContainerCheckboxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init component indeterminate father when children is checked', () => {
    component.listCheckboxs = listCheckboxs;
    component.ngOnInit();
    expect(listCheckboxs).toBeTruthy();
  });

  it('should checkSelected when emit component children', () => {
    component.checkSelected(listCheckboxs);
    expect(listCheckboxs).toBeTruthy();
  });

  it('should select checkbox when is disabled', () => {
    const check =  { id: 1, disabled: true, selected: false };
    component.listCheckboxs = listCheckboxs;

    expect(check).toEqual(component.listCheckboxs[0]);
  });

  it('should checkChildren', () => {
    component.listCheckboxs = listCheckboxs;
    component.checkChildrens(listCheckboxs[1]);

    expect(listCheckboxs[1].listCheckboxs).toBeTruthy();
  });

  it('should checkChildren when one checkbox is disabled', () => {
    component.checkChildrens(listCheckboxs2[0]);

    expect(listCheckboxs2[0]).toBeTruthy();
  });

  it('should checkChildren when one checkbox is disabled', () => {
    component.checkChildrens(listCheckboxs2[0]);

    expect(listCheckboxs2[0]).toBeTruthy();
  });

  it('should checkFather when one children is disabled', () => {
    component.fatherCheckbox = listCheckboxs2[0];
    component.checkFather(component.fatherCheckbox);

    expect(component.fatherCheckbox).toBeTruthy();
  });

  it('should checkFather when count checked equal count disabled childrens', () => {
    component.fatherCheckbox = listCheckboxs3[0];
    component.checkFather(component.fatherCheckbox);

    expect(component.fatherCheckbox).toBeTruthy();
  });

  it('should checkFather when count checked is not equal count childrens', () => {
    component.fatherCheckbox = listCheckboxs4[0];
    component.checkChildrens(listCheckboxs4[0].listCheckboxs[0]);
    component.checkFather(component.fatherCheckbox);

    expect(component.fatherCheckbox).toBeTruthy();
  });

  it('should writeValue list', () => {
    component.writeValue(listCheckboxs);

    expect(component.listCheckboxs).toEqual(listCheckboxs);
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
    component.registerOnChange(listCheckboxs);

    expect(component.registerOnChange).toBeTruthy();
  });

  it('should registerOnTouched', () => {
    component.registerOnTouched(listCheckboxs);

    expect(component.registerOnTouched).toBeTruthy();
  });
});
