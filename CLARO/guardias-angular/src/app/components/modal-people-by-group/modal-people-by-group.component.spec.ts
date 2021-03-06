import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalPeopleByGroupComponent } from './modal-people-by-group.component';

describe('ModalPeopleByGroupComponent', () => {
  let component: ModalPeopleByGroupComponent;
  let fixture: ComponentFixture<ModalPeopleByGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPeopleByGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPeopleByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
