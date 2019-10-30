import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NGZSnackbarComponent } from './snackbar.component';
import { NgModule } from '@angular/core';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZSnackbarModule } from './snackbar.module';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NGZModalDialogService } from '../../utils/services/modal/modal-dialog.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { DocumentService } from '../../utils/services/document/document.service';

@NgModule({
  imports: [ZUtilsModule, NGZSnackbarModule]
})
class TestModule {}

describe('NGZSnackbarComponent', () => {
  let component: NGZSnackbarComponent;
  let fixture: ComponentFixture<NGZSnackbarComponent>;
  let serviceModal: NGZModalDialogService;
  let documentService: DocumentService;
  let eventSubject = new BehaviorSubject(null);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ZUtilsModule, TestModule],
      providers: [DeviceDetectorService, DocumentService]
    });
  }));

  beforeEach(() => {

    documentService = TestBed.get(DocumentService);
    fixture = TestBed.createComponent(NGZSnackbarComponent);
    component = fixture.componentInstance;

    serviceModal = TestBed.get(NGZModalDialogService);
    serviceModal.openDialog(NGZSnackbarComponent, {
      childComponent: NGZSnackbarComponent,
      data: {
        closeButton: false,
        duration: 5,
        text: 'Sin conexión a internet.',
        eventName: 'Reintentar',
        onEvent: eventSubject,
        hasDuration: true
      }
    });
  });

  it('should create', () => {
    component = component.modalService.dialogComponentRef.instance;
    component.ngOnInit();
    expect(component).toBeTruthy();

  });

  it('should afterViewInit when has duration', fakeAsync(() => {
    component.ngAfterViewInit();
    tick(component.duration * 1000);

    expect(component).toBeTruthy();
  }));

  it('should afterViewInit when has not duration', fakeAsync(() => {
    component.hasDuration = false;
    component.ngAfterViewInit();
    tick(component.duration * 1000);

    expect(component).toBeTruthy();
  }));

  it('should change onPan event', () => {
    component.onAfterClose = new Subject<any>();
    const event: any = documentService.nativeDocument.createEvent('CustomEvent');
    event.deltaX = 225;
    component.onPan(event);
    expect(component).toBeTruthy();
  });

  it('should change onStop when position is higher 240px', () => {
    component.onAfterClose = new Subject<any>();
    component.posX = '250px';
    component.onPanStop();
    expect(component.posX).toEqual('250px');
  });

  it('should change onStop when position is higher -120px', () => {
    serviceModal = TestBed.get(NGZModalDialogService);
    serviceModal.openDialog(NGZSnackbarComponent, {
      childComponent: NGZSnackbarComponent,
      data: {
        closeButton: false,
        duration: 5,
        text: 'Sin conexión a internet.',
        eventName: 'Reintentar',
        onEvent: eventSubject,
        hasDuration: true
      }
    });

    component = component.modalService.dialogComponentRef.instance;
    component.ngOnInit();
    component.onAfterClose = new Subject<any>();
    component.posX = '-250px';
    component.onPanStop();
    expect(component.posX).toEqual('-250px');
  });

  it('should change onStop when position is higher 120px', () => {
    serviceModal = TestBed.get(NGZModalDialogService);
    serviceModal.openDialog(NGZSnackbarComponent, {
      childComponent: NGZSnackbarComponent,
      data: {
        closeButton: false,
        duration: 5,
        text: 'Sin conexión a internet.',
        eventName: 'Reintentar',
        onEvent: eventSubject,
        hasDuration: true
      }
    });

    component = component.modalService.dialogComponentRef.instance;
    component.ngOnInit();
    component.onAfterClose = new Subject<any>();
    component.posX = '126px';
    component.onPanStop();
    expect(component.posX).toEqual('126px');
  });

  it('should change onStop when position is less 120px', () => {
    serviceModal = TestBed.get(NGZModalDialogService);
    serviceModal.openDialog(NGZSnackbarComponent, {
      childComponent: NGZSnackbarComponent,
      data: {
        closeButton: false,
        duration: 5,
        text: 'Sin conexión a internet.',
        eventName: 'Reintentar',
        onEvent: eventSubject,
        hasDuration: true
      }
    });

    component = component.modalService.dialogComponentRef.instance;
    component.ngOnInit();
    component.posX = '16px';
    component.onPanStop();
    expect(component.posX).toEqual('8px');
  });

  it('should emit event', () => {
    component.onAfterClose = new BehaviorSubject<any>(null);
    component.eventButton();
    expect(component).toBeTruthy();
  });

  it('should emit event when not exist onAfterClose', () => {
    component.eventButton();
    expect(component).toBeTruthy();
  });

  it('should emit event', () => {
    component.onAfterClose = new BehaviorSubject<any>(null);
    component.eventButton();
    expect(component).toBeTruthy();
  });

  it('should close snackbar', () => {
    component.onAfterClose = new BehaviorSubject<any>(null);
    component.closeSnackbar();
    expect(component).toBeTruthy();
  });

  it('should create snackbar with hidden button', () => {
    component.onAfterClose = new BehaviorSubject<any>(null);
    component.closeSnackbar();

    eventSubject = new BehaviorSubject(null);

    serviceModal = TestBed.get(NGZModalDialogService);
    serviceModal.openDialog(NGZSnackbarComponent, {
      childComponent: NGZSnackbarComponent,
      data: {
        closeButton: false,
        duration: 5,
        text: 'Sin conexión a internet.',
        eventName: 'Reintentar',
        onEvent: eventSubject,
        hasDuration: true,
        isHiddenButton: true
      }
    });
    expect(component).toBeTruthy();
  });

  it('should create snackbar without hasDuration ', () => {
    component.onAfterClose = new BehaviorSubject<any>(null);
    component.closeSnackbar();

    eventSubject = new BehaviorSubject(null);

    serviceModal = TestBed.get(NGZModalDialogService);
    serviceModal.openDialog(NGZSnackbarComponent, {
      childComponent: NGZSnackbarComponent,
      data: {
        closeButton: false,
        duration: 5,
        text: 'Sin conexión a internet.',
        eventName: 'Reintentar',
        onEvent: eventSubject,
        isHiddenButton: true
      }
    });
    expect(component).toBeTruthy();
  });
});
