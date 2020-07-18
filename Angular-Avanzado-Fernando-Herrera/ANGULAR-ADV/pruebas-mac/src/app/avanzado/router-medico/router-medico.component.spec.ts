import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterMedicoComponent } from './router-medico.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY, Subject } from 'rxjs';

 
class FakeRouter {
  navigate( params ) {}
}

class FakeActivatedRoute {
  // params: Observable<any> = EMPTY;

  // vamos a manupultar el observable para agregarle valores
  private subject = new Subject(); // nos va a permitir insertar valor a un observable

  // esta funcion va agregar un valor al subject
  push(valor) {
    this.subject.next( valor );
  }

  get params() {
    // nos va a regresar un nuevo Observable
    return this.subject.asObservable();
  }

}


describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterMedicoComponent ],
      providers: [ // los neceita el componente de medicos.
        { provide: Router, useClass: FakeRouter }, // el nombre de la clase que quiero sustituir. En ves que use el router que use mi fakeRouter
        { provide: ActivatedRoute, useClass: FakeActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de redireccionar a Medico cuando se guarde', () => {
    const router = TestBed.get(Router);
    // vamos a implemetar un spy
    const spy = spyOn(router, 'navigate');

    component.guradarMedico(); // dipara la funcion de guardar Medico
    // q el espita alla sido llamado. y mandar los parametros de la navegacion q queremos probar.
    expect( spy ).toHaveBeenCalledWith(['medico', '123']);
  });

  it('Debe de color el id = nuevo', () => {

    component = fixture.componentInstance;

    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);

    activatedRoute.push({ id: 'nuevo'});

    expect(component.id).toBe('nuevo');

  })

});
