import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalDeleteRepetitionsComponent } from './modal-delete-repetitions.component';

describe('ModalDeleteRepetitionsComponent', () => {
  let component: ModalDeleteRepetitionsComponent;
  let fixture: ComponentFixture<ModalDeleteRepetitionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteRepetitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteRepetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
