import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TurnosLicenciasComponent } from './turnos-licencias.component';

describe('TurnosLicenciasComponent', () => {
  let component: TurnosLicenciasComponent;
  let fixture: ComponentFixture<TurnosLicenciasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosLicenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
