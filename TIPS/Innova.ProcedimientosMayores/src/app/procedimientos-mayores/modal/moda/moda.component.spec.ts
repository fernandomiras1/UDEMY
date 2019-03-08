import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaComponent } from './moda.component';

describe('ModaComponent', () => {
  let component: ModaComponent;
  let fixture: ComponentFixture<ModaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
