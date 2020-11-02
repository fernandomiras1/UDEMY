import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShowTurnComponent } from './modal-show-turn.component';

describe('ModalShowTurnComponent', () => {
  let component: ModalShowTurnComponent;
  let fixture: ComponentFixture<ModalShowTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShowTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
