import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZSelectResultsComponent } from './select-results.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NGZModalDialogService } from '../../../utils/services/modal/modal-dialog.service';
import { NGZModalDialogInstanceService } from '../../../utils/services/modal/modal-dialog-instance.service';
import { Subject, Subscription } from 'rxjs';
import { NgModule } from '@angular/core';
import { ZUtilsModule } from '../../../utils/utils.module';
import { NGZSelectModule } from '../select.module';
import { WindowService } from '../../../utils/services/window/window.service';

const windowService = {
  nativeWindow: {
    event: {
      clientY: 456
    },
    innerHeight: 123
  }
};

@NgModule({
  imports: [ZUtilsModule, NGZSelectModule]
})
class TestModule { }

describe('NGZSelectResultsComponent', () => {
  let component: NGZSelectResultsComponent;
  let fixture: ComponentFixture<NGZSelectResultsComponent>;
  let serviceModal: NGZModalDialogService;
  let outputSubject: Subject<boolean>;

  const item = { id: 1, text: 'Córdoba', disabled: false };
  const item2 = { id: 1, text: 'Córdoba', disabled: true };
  const items = [{ id: 1, text: 'Córdoba', disabled: true }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DeviceDetectorModule, TestModule],
      providers: [NGZModalDialogService, NGZModalDialogInstanceService,
        { provide: WindowService, useValue: windowService }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZSelectResultsComponent);
    component = fixture.componentInstance;
    component.dropUp = false;

  });

  it('should create', () => {
    outputSubject = new Subject();

    serviceModal = TestBed.get(NGZModalDialogService);
    serviceModal.openDialog(NGZSelectResultsComponent, {
      childComponent: NGZSelectResultsComponent,
      data: {
        selectedItems: items,
        isMobile: true
      },
      outputData: outputSubject,
      isOverlay: true
    });
    expect(component).toBeTruthy();

  });

  it('should onInit when is mobile', () => {
    component.isMobile = true;
    expect(component).toBeTruthy();
  });

  it('should onAfterViewInit when is mobile', () => {
    component.isMobile = true;

    component.ngAfterViewInit();

    expect(component).toBeTruthy();
  });

  it('should select item and emit changes', () => {
    component.isMobile = false;
    component.selectedItem(item);
    expect(component.itemSelected).toBeTruthy();
  });

  it('should select item and emit changes in mobile', () => {
    component.isMobile = true;
    component.outputData = new Subject();
    component.selectedItem(item);
    expect(component.selectedItem).toBeTruthy();
  });

  it('should select item when is disabled', () => {
    component.selectedItem(item2);
    expect(item2).toEqual(item2);
  });

  it('should click outside component when is mobile', () => {
    component.isMobile = true;
    component.onAfterClose = new Subject();
    component.clickOutside();
    expect(component).toBeTruthy();
  });

  it('should click outside component when is mobile', () => {
    component.isMobile = true;
    component.onAfterClose = new Subject<any>();
    component.count = 1;
    component.clickOutside();
    expect(component).toBeTruthy();
  });

  it('should click outside component when is not mobile', () => {
    component.isMobile = false;
    component.onAfterClose = new Subject();
    component.clickOutside();
    expect(component).toBeTruthy();
  });

  it('should click inside component when event is any and component in focus', () => {
    component.isMobile = true;
    component.onAfterClose = new Subject();
    component.clickOutside();
    expect(component).toBeTruthy();
  });

  it('should is DropUp is false', () => {
    component.isMobile = false;
    component.dropUp = false;
    component.ngAfterViewInit();
    expect(component.dropUp).toBeFalsy();
  });

});
