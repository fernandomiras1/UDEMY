import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZSelectComponent } from './select.component';
import { ZUtilsModule } from '../../utils/utils.module';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';
import { NgModule } from '@angular/core';
import { NGZSelectModule } from './select.module';

@NgModule({
  imports: [ZUtilsModule, NGZSelectModule]
})
class TestModule {}

describe('NGZSelectComponent', () => {
  let component: NGZSelectComponent;
  let fixture: ComponentFixture<NGZSelectComponent>;
  const item = { id: 1, text: 'Córdoba' };
  const successMessage = 'Está todo bien';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ZUtilsModule, DeviceDetectorModule, TestModule],
      providers: [DeviceDetectorService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should item result selected and show item', () => {
    component.iconOpen = true;
    component.openItemsResult();
    expect(component).toBeTruthy();
  });

  it('should item result selected and show item when is mobile', () => {
    component.isMobileSelect = true;
    component.ngOnInit();
    component.openItemsResult();

    expect(component).toBeTruthy();
  });

  it('should item result close and trigger validation', () => {
    component.openItemsResult();
    expect(component).toBeTruthy();
  });

  it('should item result selected when is disabled', () => {
    component.disabled = true;
    component.openItemsResult();
    expect(component).toBeTruthy();
  });

  it('should checkValidation when is true in onInit', () => {
    component.submit = new BehaviorSubject(true);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should execute onInit when device is mobile', () => {
    component.isMobileSelect = true;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should execute onInit when item value is not required', () => {
    component.required = false;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should checkValidation when is false in onInit', () => {
    component.isMobileSelect = false;
    component.submit = new BehaviorSubject(false);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should item select is emited', () => {
    component.messagesSuccess = successMessage;
    component.itemSelect(item);
    expect(component.item).toEqual(item);
  });

  it('should item select is emited when value is null', () => {
    component.inFocus = true;
    component.itemSelect(null);
    expect(component.item).toEqual(null);
  });

  it('should click inside component when event is null', () => {
    component.inFocus = true;
    component.clickOutside(null);
    expect(component.item).toEqual(null);
  });

  it('should click inside component when event is any and component in focus', () => {
    component.inFocus = true;
    component.clickOutside(item);
    expect(component.item).not.toEqual(item);
  });

  it('should click inside component when event is any and component in outfocus', () => {
    component.inFocus = false;
    component.clickOutside(item);
    expect(component.item).not.toEqual(item);
  });

  it('should state line error success', () => {
    component.errors = ['success'];
    component.messagesSuccess = 'Esta todo bien';
    component.statusLinesErrorSuccess();
    expect(component.isErrorLine).toEqual(false);
  });
});
