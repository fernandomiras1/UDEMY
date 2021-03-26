import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalDeleteTurnComponent } from './modal-delete-turn.component';

describe('ModalDeleteTurnComponent', () => {
  let component: ModalDeleteTurnComponent;
  let fixture: ComponentFixture<ModalDeleteTurnComponent>;

  beforeEach(waitForAsync(() => {
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
