import { ZRippleEffectDirective } from './ripple-effect.directive';
import { Component, DebugElement, Renderer2 } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NGZButtonModule } from '../../../components/button/button.module';
import { ZBrowser } from '../../util/browser/browser';
import { DocumentService } from '../../services/document/document.service';
import { WindowService } from '../../services/window/window.service';

@Component({
  template: `<z-button type="text" zRippleEffect >
             </z-button>`
})
class TestRippleEffectComponent {
}

describe('ZRippleEffectDirective', () => {

  let component: TestRippleEffectComponent ;
  let fixture: ComponentFixture<TestRippleEffectComponent >;
  let inputEl: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [Renderer2, DocumentService, WindowService],
      imports: [NGZButtonModule],
      declarations: [TestRippleEffectComponent]
    });

    fixture = TestBed.createComponent(TestRippleEffectComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.queryAll(By.directive(ZRippleEffectDirective));
  }));

  it('should click in button', fakeAsync(() => {
    const dir = inputEl[0].injector.get(ZRippleEffectDirective) as ZRippleEffectDirective;
    const button = inputEl[0].nativeElement as HTMLButtonElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick(600);
    expect(dir).toBeTruthy();
  }));

  it('should click in button when isClickable is false', () => {
    const dir = inputEl[0].injector.get(ZRippleEffectDirective) as ZRippleEffectDirective;
    const button = inputEl[0].nativeElement as HTMLButtonElement;
    dir.isClickable = false;
    dir.isClickable = false;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should click in button and not ripple when is safari', () => {
    const window = TestBed.get(WindowService);
    const browser = new ZBrowser(window);
    spyOn(browser, 'getBrowser').and.returnValue('safari');
    const dir = inputEl[0].injector.get(ZRippleEffectDirective) as ZRippleEffectDirective;
    const button = inputEl[0].nativeElement as HTMLButtonElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(dir).toBeTruthy();
  });
});
