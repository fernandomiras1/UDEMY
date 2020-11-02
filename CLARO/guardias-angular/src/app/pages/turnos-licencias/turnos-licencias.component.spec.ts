import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosLicenciasComponent } from './turnos-licencias.component';

describe('TurnosLicenciasComponent', () => {
  let component: TurnosLicenciasComponent;
  let fixture: ComponentFixture<TurnosLicenciasComponent>;

  beforeEach(async(() => {
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
