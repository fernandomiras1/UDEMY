import { TestBed } from '@angular/core/testing';
import { ISnackbarData, NGZSnackbarService } from './snackbar.service';
import { NgModule } from '@angular/core';
import { ZUtilsModule } from '../../../utils/utils.module';
import { NGZSnackbarModule } from '../snackbar.module';
import { BehaviorSubject, Subject } from 'rxjs';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';

@NgModule({
  imports: [ZUtilsModule, NGZSnackbarModule, DeviceDetectorModule],
  providers: [DeviceDetectorService, NGZSnackbarService]
})
class TestModule {}

describe('NGZSnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [TestModule]
  }));

  it('should be created', () => {
    const service: NGZSnackbarService = TestBed.get(NGZSnackbarService);
    expect(service).toBeTruthy();
  });

  it('should method showSnackbar', () => {
    const service: NGZSnackbarService = TestBed.get(NGZSnackbarService);

    const dataSnackbar: ISnackbarData = {
      isHiddenButton: false,
      duration: 5,
      text: 'Sin conexión a internet.',
      eventName: 'Reintentar',
      onEvent: new BehaviorSubject(null),
      hasDuration: true
    };
    service.showSnackbar(dataSnackbar, new Subject<any>());
    expect(service).toBeTruthy();
  });

  it('should method close', () => {
    const service: NGZSnackbarService = TestBed.get(NGZSnackbarService);

    const dataSnackbar: ISnackbarData = {
      isHiddenButton: false,
      duration: 5,
      text: 'Sin conexión a internet.',
      eventName: 'Reintentar',
      onEvent: new BehaviorSubject(null),
      hasDuration: true
    };
    service.showSnackbar(dataSnackbar, new Subject<any>());
    service.closeSnackbar();
    expect(service).toBeTruthy();
  });
});
