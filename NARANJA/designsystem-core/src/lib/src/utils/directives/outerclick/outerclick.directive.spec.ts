import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Component, EventEmitter, Output } from '@angular/core';
import { ZOuterClickDirective } from './outerclick.directive';

@Component({
  template: '<div id="container"><div id="innerDirective" zOuterClick (clickOutside)="onClickOutside($event)">\
    </div><div id="outerDirective"></div></div>'
})
class TestHostComponent {
  @Output() public clickOutside = new EventEmitter();

  onClickOutside(value) {
    this.clickOutside.emit(value);
  }
}

describe('ZOuterClickDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ZOuterClickDirective,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
  }));

  it('should click outside the div and return a null value', fakeAsync(() => {
    const div = el.querySelector('#outerDirective');
    component.clickOutside.subscribe((x) => {
      expect(x).toBe(null);
    });
    div.click();
    fixture.detectChanges();
  }));

  it('should click inside the div and return a null value', fakeAsync(() => {
    fixture.detectChanges();
    const div = el.querySelector('#innerDirective');
    component.clickOutside.subscribe((x) => {
      expect(x).toBe(null);
    });
    div.click();
    fixture.detectChanges();
  }));
});
