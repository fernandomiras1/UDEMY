import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDisabledTurnComponent } from './modal-disabled-turn.component';

describe('ModalDisabledTurnComponent', () => {
  let component: ModalDisabledTurnComponent;
  let fixture: ComponentFixture<ModalDisabledTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDisabledTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDisabledTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
