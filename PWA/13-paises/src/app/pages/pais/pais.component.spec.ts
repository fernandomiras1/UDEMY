import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisComponent } from './pais.component';

describe('PaisComponent', () => {
  let component: PaisComponent;
  let fixture: ComponentFixture<PaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
