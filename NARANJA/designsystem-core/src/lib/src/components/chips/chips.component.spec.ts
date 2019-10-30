import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZContainerChipsComponent, ChipsComponentType } from './chips.component';
import { NGZChipComponent } from './chip/chip.component';
import { ZRippleEffectDirective } from '../../utils/directives/ripple-effect/ripple-effect.directive';

describe('ChipsComponent', () => {
  let component: NGZContainerChipsComponent;
  let fixture: ComponentFixture<NGZContainerChipsComponent>;
  const list = [{ id: 1, disabled: false, selected: false, text: 'Plan z' },
    { id: 2, disabled: true, selected: false, text: 'Chip 312312311' },
    { id: 3, disabled: false, selected: true, text: 'Chip 312311' }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZContainerChipsComponent, NGZChipComponent, ZRippleEffectDirective]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZContainerChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component chips', () => {
    expect(component).toBeTruthy();
  });

  it('should doCheck when firstTime true', () => {
    const listCheck = [{ id: 1, disabled: false, selected: false, text: 'Plan z' },
      { id: 2, disabled: true, selected: true, text: 'Chip 312312311' },
      { id: 3, disabled: false, selected: false, text: 'Chip 312311' }];
    component.multiple = false;
    component.firstTime = true;
    component.listChips = listCheck;
    component.defaultIndexSelected = 2;

    component.ngDoCheck();

    expect(component.listChips[component.defaultIndexSelected]).toEqual(list[component.defaultIndexSelected]);
  });

  it('should doCheck when firstTime true and listChips is []', () => {
    const listCheck = [];
    component.multiple = false;
    component.firstTime = true;
    component.listChips = listCheck;
    component.defaultIndexSelected = 2;

    component.ngDoCheck();

    expect(component.listChips).toBeTruthy();
  });

  it('should doCheck when firstTime true and chip index is disabled', () => {
    const listCheck = [{ id: 1, disabled: false, selected: false, text: 'Plan z' },
      { id: 2, disabled: true, selected: false, text: 'Chip 312312311' },
      { id: 3, disabled: false, selected: false, text: 'Chip 312311' }];
    const chip = { id: 1, disabled: false, selected: true, text: 'Plan z' };
    component.multiple = false;
    component.firstTime = true;
    component.listChips = listCheck;
    component.defaultIndexSelected = 1;

    component.ngDoCheck();

    expect(component.listChips[component.defaultIndexSelected]).toEqual(chip);
  });

  it('should doCheck when firstTime true, chip index is disabled and chip index sub 0 too', () => {
    const listCheck = [{ id: 1, disabled: true, selected: false, text: 'Plan z' },
      { id: 2, disabled: true, selected: false, text: 'Chip 312312311' },
      { id: 3, disabled: false, selected: false, text: 'Chip 312311' }];
    component.multiple = false;
    component.firstTime = true;
    component.listChips = listCheck;
    component.defaultIndexSelected = 1;

    component.ngDoCheck();

    expect(component).toBeTruthy();
  });

  it('should doCheck when firstTime false', () => {

    component.multiple = false;
    component.firstTime = false;
    component.defaultIndexSelected = 1;

    component.ngDoCheck();

    expect(component).toBeTruthy();
  });

  it('should set list values', () => {
    component.listChips = list;
    expect(component.listChips).toEqual(list);
  });

  it('should chipSelected when multiple false', () => {
    component.multiple = false;
    component.listChips = list;
    const index = component.listChips.length - 1;
    component.chipSelected(index);

    expect(component.listChips).toEqual(list);
  });

  it('should chipSelected when multiple true', () => {
    component.multiple = true;
    component.listChips = list;
    const index = component.listChips.length - 1;
    component.chipSelected(index);

    expect(component.listChips).toEqual(list);
  });

  it('should writeValue list', () => {
    component.writeValue(list);

    expect(component.listChips).toEqual(list);
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
    component.registerOnChange(list);

    expect(component.registerOnChange).toBeTruthy();
  });

  it('should registerOnTouched', () => {
    component.registerOnTouched(list);

    expect(component.registerOnTouched).toBeTruthy();
  });

  it('should input type radio', () => {
    component.type = ChipsComponentType.RADIO;

    expect(component.isRadio).toEqual(true);
  });

  it('should input type checkbox', () => {
    component.type = ChipsComponentType.CHECKBOX;

    expect(component.multiple).toEqual(true);
  });

  it('should input type default', () => {
    component.type = 'null';

    expect(component.isRadio).toEqual(false);
  });

  it('should chipSelected when isRadio and is selected', () => {
    component.isRadio = true;
    component.listChips = list;
    const index = component.listChips.length - 1;
    component.oldChip = list[index];
    component.chipSelected(index);

    expect(component.isRadio).toEqual(true);
  });

});
