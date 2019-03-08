/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecategorizationComponent } from './recategorization.component';

describe('RecategorizationComponent', () => {
  let component: RecategorizationComponent;
  let fixture: ComponentFixture<RecategorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecategorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecategorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
