import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalComponent } from './hospital.component';

describe('HospitalComponent', () => {
  let component: HospitalComponent;
  let fixture: ComponentFixture<HospitalComponent>;

  // le pone el async para que se espere que ese beforeEach termine para pasar al siguiente beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crear un Hospital Component', () => {
    expect(component).toBeTruthy();
  });
});
