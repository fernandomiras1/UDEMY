import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicenciasComponent } from './licencias.component';

describe('LicenciasComponent', () => {
  let component: LicenciasComponent;
  let fixture: ComponentFixture<LicenciasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
