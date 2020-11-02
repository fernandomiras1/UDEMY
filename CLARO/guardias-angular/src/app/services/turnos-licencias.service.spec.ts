import { TestBed } from '@angular/core/testing';

import { TurnosLicenciasService } from './turnos-licencias.service';

describe('TurnosLicenciasService', () => {
  let service: TurnosLicenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnosLicenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
