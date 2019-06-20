/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TasasPlazoFijoComponent } from './tasas-plazoFijo.component';

describe('TasasPlazoFijoComponent', () => {
  let component: TasasPlazoFijoComponent;
  let fixture: ComponentFixture<TasasPlazoFijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasasPlazoFijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasasPlazoFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
