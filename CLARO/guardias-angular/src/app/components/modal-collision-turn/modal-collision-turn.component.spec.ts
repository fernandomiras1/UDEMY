import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCollisionTurnComponent } from './modal-collision-turn.component';

describe('ModalCollisionTurnComponent', () => {
  let component: ModalCollisionTurnComponent;
  let fixture: ComponentFixture<ModalCollisionTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCollisionTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCollisionTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
