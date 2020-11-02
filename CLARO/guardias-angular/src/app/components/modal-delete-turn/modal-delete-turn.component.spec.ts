import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteTurnComponent } from './modal-delete-turn.component';

describe('ModalDeleteTurnComponent', () => {
  let component: ModalDeleteTurnComponent;
  let fixture: ComponentFixture<ModalDeleteTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
