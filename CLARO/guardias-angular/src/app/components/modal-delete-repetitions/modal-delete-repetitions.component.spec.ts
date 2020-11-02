import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteRepetitionsComponent } from './modal-delete-repetitions.component';

describe('ModalDeleteRepetitionsComponent', () => {
  let component: ModalDeleteRepetitionsComponent;
  let fixture: ComponentFixture<ModalDeleteRepetitionsComponent>;

  beforeEach(async(() => {
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
