import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidarTelefonoComponent } from './modal-validar-telefono.component';

describe('ModalValidarTelefonoComponent', () => {
  let component: ModalValidarTelefonoComponent;
  let fixture: ComponentFixture<ModalValidarTelefonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalValidarTelefonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalValidarTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
