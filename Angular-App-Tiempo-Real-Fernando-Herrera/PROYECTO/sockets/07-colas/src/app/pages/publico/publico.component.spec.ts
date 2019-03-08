import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicoComponent } from './publico.component';

describe('PublicoComponent', () => {
  let component: PublicoComponent;
  let fixture: ComponentFixture<PublicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
