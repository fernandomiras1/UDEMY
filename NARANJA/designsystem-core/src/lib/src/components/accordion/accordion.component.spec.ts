/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZAccordionComponent } from './accordion.component';

describe('NGZAccordionComponent', () => {
  let component: NGZAccordionComponent;
  let fixture: ComponentFixture<NGZAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZAccordionComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change isOpen when on click', () => {
    component.onClick();
    expect(component.isOpen).toEqual(true);
  });
});
