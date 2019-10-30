import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZDialogComponent } from './dialog.component';
import { Subject } from 'rxjs';
import { IDialogData, NGZDialogService } from './services/dialog.service';
import { NGZDialogModule } from './dialog.module';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';

const deviceDetecter = {
  isMobile: () => true
};

describe('NGZDialogComponent', () => {
  let component: NGZDialogComponent;
  let fixture: ComponentFixture<NGZDialogComponent>;
  let service: NGZDialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NGZDialogModule, DeviceDetectorModule],
      providers: [NGZDialogService,
        { provide: DeviceDetectorService, useValue: deviceDetecter }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZDialogComponent);
    component = fixture.componentInstance;

    service = TestBed.get(NGZDialogService);
    const dialogData: IDialogData = {
      contentIcon: {
        iconName: 'icon-message'
      },
      actionsButtons: [
        {
          text: 'Cancelar',
          onAction: new Subject<any>()
        },
        {
          text: 'Aceptar',
          onAction: new Subject<any>()
        }
      ],
      title: 'Tu saldo no alcanza',
      paragraph: 'Agregá más dinero a tu cuenta para recargar $150 a tu Red Bus.'
    };

    service.showDialog(dialogData, new Subject<any>());
  });

  it('should set width when is mobile', () => {
    component.isMobile = deviceDetecter.isMobile();
    component = component.modalService.dialogComponentRef.instance;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should set width when no is mobile', () => {
    component = component.modalService.dialogComponentRef.instance;
    component.isMobile = false;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should execute ngOnInit when is not mobile', () => {
    component.isMobile = false;
    component = component.modalService.dialogComponentRef.instance;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should click outside component when onAfterClose is not null', () => {
    component.onAfterClose = new Subject();
    component.clickOutside();
    expect(component).toBeTruthy();
  });

  it('should click outside component when onAfterClose is null', () => {
    component.clickOutside();
    expect(component).toBeTruthy();
  });

  it('should click button dispatch event', () => {
    service = TestBed.get(NGZDialogService);
    const dialogData: IDialogData = {
      contentIcon: {
        iconName: 'icon-message'
      },
      actionsButtons: [
        {
          text: 'Cancelar',
          onAction: new Subject<any>()
        },
        {
          text: 'Aceptar',
          onAction: new Subject<any>()
        }
      ],
      title: 'Tu saldo no alcanza',
      paragraph: 'Agregá más dinero a tu cuenta para recargar $150 a tu Red Bus.'
    };

    service.showDialog(dialogData, new Subject<any>());
    component.eventAction({ onAction: new Subject<any>(), text: 'aaa' });
    expect(component).toBeTruthy();
  });

  it('should display dialog without container icon', () => {
    service = TestBed.get(NGZDialogService);
    const dialogData: IDialogData = {
      actionsButtons: [
        {
          text: 'Cancelar',
          onAction: new Subject<any>()
        },
        {
          text: 'Aceptar',
          onAction: new Subject<any>()
        }
      ],
      title: 'Tu saldo no alcanza',
      paragraph: 'Agregá más dinero a tu cuenta para recargar $150 a tu Red Bus.'
    };

    service.showDialog(dialogData, new Subject<any>());
    component = component.modalService.dialogComponentRef.instance;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should set dialog in mobile', () => {
    service = TestBed.get(NGZDialogService);
    const dialogData: IDialogData = {
      actionsButtons: [
        {
          text: 'Cancelar',
          onAction: new Subject<any>()
        },
        {
          text: 'Aceptar',
          onAction: new Subject<any>()
        }
      ],
      title: 'Tu saldo no alcanza',
      paragraph: 'Agregá más dinero a tu cuenta para recargar $150 a tu Red Bus.'
    };

    service.showDialog(dialogData, new Subject<any>());
    component = component.modalService.dialogComponentRef.instance;
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });
});
