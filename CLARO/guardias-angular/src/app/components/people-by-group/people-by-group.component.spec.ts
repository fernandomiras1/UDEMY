import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleByGroupComponent } from './people-by-group.component';

describe('PeopleByGroupComponent', () => {
  let component: PeopleByGroupComponent;
  let fixture: ComponentFixture<PeopleByGroupComponent>;

  beforeEach(async(() => {
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
