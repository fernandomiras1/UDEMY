import { TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { ZUtilsModule } from '../../../utils/utils.module';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { NGZCustomDialogModule } from '../custom-dialog.module';
import { ICustomDialogOptions, NGZCustomDialogService } from './custom-dialog.service';
import { NGZButtonModule } from '../../button/button.module';

@Component({
  template: `<z-button type="text">
             </z-button>`
})
class TestCustomDialogComponent {
}

@NgModule({
  declarations: [TestCustomDialogComponent],
  imports: [ZUtilsModule, NGZCustomDialogModule, NGZButtonModule, DeviceDetectorModule],
  providers: [DeviceDetectorService, NGZCustomDialogService],
  entryComponents: [TestCustomDialogComponent]
})
class TestModule {}

describe('NGZCustomDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [TestModule]
  }));

  it('should be created', () => {
    const service: NGZCustomDialogService = TestBed.get(NGZCustomDialogService);
    expect(service).toBeTruthy();
  });

  it('should method showDialog', () => {
    const service: NGZCustomDialogService = TestBed.get(NGZCustomDialogService);

    service.showDialog(TestCustomDialogComponent, new Subject<any>());
    expect(service).toBeTruthy();
  });

  it('should method showDialog with onActionClose', () => {
    const service: NGZCustomDialogService = TestBed.get(NGZCustomDialogService);

    const optionsCustomDialog: ICustomDialogOptions = {
      onActionClose: new Subject<any>()
    };
    service.showDialog(TestCustomDialogComponent, new Subject<any>(), 'Title', optionsCustomDialog);
    expect(service).toBeTruthy();
  });

  it('should method closeDialog', () => {
    const service: NGZCustomDialogService = TestBed.get(NGZCustomDialogService);
    service.showDialog(TestCustomDialogComponent, new Subject<any>());
    service.closeDialog();
    expect(service).toBeTruthy();
  });
});
