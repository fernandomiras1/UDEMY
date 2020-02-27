import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailShellComponent } from './contact-detail-shell.component';

describe('ContactDetailShellComponent', () => {
  let component: ContactDetailShellComponent;
  let fixture: ComponentFixture<ContactDetailShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
