import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZSliderControlComponent } from './slider-control.component';
import { EventEmitter } from '@angular/core';

describe('SliderControlComponent', () => {
  let component: NGZSliderControlComponent;
  let fixture: ComponentFixture<NGZSliderControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZSliderControlComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZSliderControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onMouseUp', () => {
    component.onMouseUp(2);
    expect(component).toBeTruthy();
  });

  it('should onMouseUp null', () => {
    component.onMouseUp(undefined);
    expect(component).toBeTruthy();
  });

  it('should inputEvent', () => {
    component.inputEvent(2);
    expect(component).toBeTruthy();
  });
});
