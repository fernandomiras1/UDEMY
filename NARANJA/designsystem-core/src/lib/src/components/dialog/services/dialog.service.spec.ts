import { TestBed } from '@angular/core/testing';
import { IDialogData, NGZDialogService } from './dialog.service';
import { NgModule } from '@angular/core';
import { ZUtilsModule } from '../../../utils/utils.module';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';
import { NGZDialogModule } from '../dialog.module';
import { Subject } from 'rxjs';

@NgModule({
  imports: [ZUtilsModule, NGZDialogModule, DeviceDetectorModule],
  providers: [DeviceDetectorService, NGZDialogService]
})
class TestModule {}

describe('NGZDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [TestModule]
  }));

  it('should be created', () => {
    const service: NGZDialogService = TestBed.get(NGZDialogService);
    expect(service).toBeTruthy();
  });

  it('should method showDialog', () => {
    const service: NGZDialogService = TestBed.get(NGZDialogService);

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
    expect(service).toBeTruthy();
  });

  it('should method closeDialog', () => {
    const service: NGZDialogService = TestBed.get(NGZDialogService);

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
    service.closeDialog();
    expect(service).toBeTruthy();
  });
});
