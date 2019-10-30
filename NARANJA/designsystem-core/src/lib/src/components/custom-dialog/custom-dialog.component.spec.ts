import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NGZCustomDialogComponent } from './custom-dialog.component';
import { NGZCardModule } from '../card/card.module';
import { NGZModalDialogService } from '../../utils/services/modal/modal-dialog.service';
import { NGZCustomDialogService } from './services/custom-dialog.service';
import { Subject } from 'rxjs';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZCustomDialogModule } from './custom-dialog.module';
import { DeviceDetectorService } from 'ngx-device-detector';

const deviceDetecter = {
  isMobile: () => true
};

@Component({
  template: `<div>">
             </div>`
})
class TestCustomDialogComponent {
}

@NgModule({
  declarations: [TestCustomDialogComponent],
  imports: [NGZCardModule, CommonModule],
  entryComponents: [TestCustomDialogComponent]
})
class TestModule {}

xdescribe('NGZCustomDialogComponent', () => {
  let component: NGZCustomDialogComponent;
  let fixture: ComponentFixture<NGZCustomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DeviceDetectorService, useValue: deviceDetecter },
        NGZModalDialogService, NGZCustomDialogService],
      imports: [TestModule, NGZCustomDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZCustomDialogComponent);
    component = fixture.componentInstance;
    const service: NGZCustomDialogService = TestBed.get(NGZCustomDialogService);

    service.showDialog(TestCustomDialogComponent, new Subject<any>());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set width when is mobile', () => {
    component.isMobile = deviceDetecter.isMobile();
    component.ngAfterViewInit();
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should set width when is not mobile', () => {
    component.isMobile = false;
    component.ngAfterViewInit();
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should click outside component', () => {
    component.clickOutside();
    expect(component).toBeTruthy();
  });
});
