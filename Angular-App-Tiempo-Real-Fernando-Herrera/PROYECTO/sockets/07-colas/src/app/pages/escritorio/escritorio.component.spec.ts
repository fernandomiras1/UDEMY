import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscritorioComponent } from './escritorio.component';

describe('EscritorioComponent', () => {
  let component: EscritorioComponent;
  let fixture: ComponentFixture<EscritorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscritorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
