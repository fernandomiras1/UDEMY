import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalTurnoComponent } from './modal-turno.component';

describe('ModalTurnoComponent', () => {
  let component: ModalTurnoComponent;
  let fixture: ComponentFixture<ModalTurnoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
