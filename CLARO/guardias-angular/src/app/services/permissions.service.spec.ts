import { TestBed } from '@angular/core/testing';

import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
  let service: PermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    let rol = new GeneralService('guardia');
    service = TestBed.inject(PermissionsService);
  });

  it('Si el rol del usuario logeado esta permitido', () => {
    //let rol = new GeneralService('guardia');
    //let permisions = new PermissionsService(new GeneralService('guardia'))
    service.has(['guardia'])
    expect(service).toBeTruthy();
  });

});

class GeneralService {
  rol;
  constructor(rol) {
    this.rol = rol
  }
  getUser() {
    return {rol: this.rol};
  }
}