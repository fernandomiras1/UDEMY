import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalProfileValidationsComponent } from './modal-profile-validations.component';

describe('ModalProfileValidationsComponent', () => {
  let component: ModalProfileValidationsComponent;
  let fixture: ComponentFixture<ModalProfileValidationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProfileValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProfileValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
