import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTicketComponent } from './nuevo-ticket.component';

describe('NuevoTicketComponent', () => {
  let component: NuevoTicketComponent;
  let fixture: ComponentFixture<NuevoTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
