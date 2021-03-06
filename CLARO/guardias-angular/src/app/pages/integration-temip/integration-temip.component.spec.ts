import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntegrationTemipComponent } from './integration-temip.component';

describe('IntegrationTemipComponent', () => {
  let component: IntegrationTemipComponent;
  let fixture: ComponentFixture<IntegrationTemipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationTemipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationTemipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
