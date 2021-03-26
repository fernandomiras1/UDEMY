import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalShowTurnComponent } from './modal-show-turn.component';

describe('ModalShowTurnComponent', () => {
  let component: ModalShowTurnComponent;
  let fixture: ComponentFixture<ModalShowTurnComponent>;

  beforeEach(waitForAsync(() => {
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
