import { MedicoService } from './medico.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoComponent } from './medico.component';
import { HttpClientModule } from '@angular/common/http';

describe('MedicoComponent', () => {
  let component: MedicoComponent;
  // ComponentFixture: poder tener accedo al DOM
  let fixture: ComponentFixture<MedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoComponent ],
      providers: [ MedicoService ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoComponent);
    component = fixture.componentInstance; // instancia del componete.
    fixture.detectChanges();
  });

  it('Debe de crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de retornar el nombre del medico', () => {
    const nombre = 'Juan';
    const resu = component.saludarMedico(nombre);
    expect(resu).toContain(nombre);
  });


});
