import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPeopleByGroupComponent } from './modal-edit-people-by-group.component';

describe('ModalEditPeopleByGroupComponent', () => {
  let component: ModalEditPeopleByGroupComponent;
  let fixture: ComponentFixture<ModalEditPeopleByGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditPeopleByGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditPeopleByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
