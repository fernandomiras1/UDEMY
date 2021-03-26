import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PeopleByGroupComponent } from './people-by-group.component';

describe('PeopleByGroupComponent', () => {
  let component: PeopleByGroupComponent;
  let fixture: ComponentFixture<PeopleByGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleByGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
