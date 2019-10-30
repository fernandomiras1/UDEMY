import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Component, EventEmitter, Output } from '@angular/core';
import { ZBrowserDirective } from './browser.directive';

@Component({
  template: '<div id="container" zBrowser></div>'
})
class TestHostComponent {
}

xdescribe('ZBrowserDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ZBrowserDirective,
        TestHostComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
  }));

  it('should add a specific class that identify the browser', fakeAsync(()  => {
    const div = el.children.container;
    expect(div.getAttribute('class')).toContain('browser-');
  }));

  it('should test window.navigator.userAgent chrome', () => {
    navigator['__defineGetter__']('userAgent', () => {
      return 'chrome';
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    const div = el.children.container;
    expect(div.getAttribute('class')).toContain('browser-chrome');
  });
  it('should test window.navigator.userAgent edge', () => {
    navigator['__defineGetter__']('userAgent', () => {
      return 'edge';
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    const div = el.children.container;
    expect(div.getAttribute('class')).toContain('browser-edge');
  });
  it('should test window.navigator.userAgent firefox', () => {
    navigator['__defineGetter__']('userAgent', () => {
      return 'firefox';
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    const div = el.children.container;
    expect(div.getAttribute('class')).toContain('browser-firefox');
  });
  it('should test window.navigator.userAgent safari', () => {
    navigator['__defineGetter__']('userAgent', () => {
      return 'firefox';
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    const div = el.children.container;
    expect(div.getAttribute('class')).toContain('browser-firefox');
  });
  it('should test window.navigator.userAgent safari', () => {
    const wind = jasmine.createSpy('window.navigator.userAgent');
    wind.and.returnValue('safari');
    navigator['__defineGetter__']('userAgent', () => {
      return 'safari';
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    const div = el.children.container;
    expect(div.getAttribute('class')).toContain('browser-safari');
  });
  it('should test window.navigator.userAgent fake', () => {
    navigator['__defineGetter__']('userAgent', () => {
      return 'mmmmm';
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    const div = el.children.container;
    expect(div.getAttribute('class')).toContain('browser-none');
  });
  it('should test window.navigator.userAgent ie', () => {
    navigator['__defineGetter__']('userAgent', () => {
      return 'trident';
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    const div = el.children.container;
    expect(div.getAttribute('class')).toContain('browser-ie');
  });
});
