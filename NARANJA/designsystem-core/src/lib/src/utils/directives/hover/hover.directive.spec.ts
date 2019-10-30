import { ZHoverDirective } from './hover.directive';
import { Component, DebugElement, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZUtilsModule } from '../../utils.module';
import { DocumentService } from '../../services/document/document.service';

@Component({
  template: `<div zHover style="width: 100px;">
             </div>`
})
class TestHoverComponent {
}

describe('ZHoverDirective', () => {

  let component: TestHoverComponent;
  let fixture: ComponentFixture<TestHoverComponent>;
  let inputEl: DebugElement[];
  let documentService: DocumentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [Renderer2, DocumentService],
      imports: [ZUtilsModule],
      declarations: [TestHoverComponent]
    });

    fixture = TestBed.createComponent(TestHoverComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.queryAll(By.directive(ZHoverDirective));
    documentService = TestBed.get(DocumentService);
  }));

  it('should mouse enter when isHover is true', () => {
    const dir = inputEl[0].injector.get(ZHoverDirective) as ZHoverDirective;
    const div = inputEl[0].nativeElement as HTMLDivElement;
    const hoverStyleEnter = [{ style: 'box-shadow', value: '0 1px 4px 0 rgba(0, 0, 0, 0.3), 0 4px 8px 0 rgba(0, 0, 0, 0.08)' },
      { style: 'position', value: 'initial' }, { style: 'cursor', value: 'initial' }];
    const style = `{"${hoverStyleEnter[0].style}":"${hoverStyleEnter[0].value}",` +
      `"${hoverStyleEnter[1].style}":"${hoverStyleEnter[1].value}","${hoverStyleEnter[2].style}":"${hoverStyleEnter[2].value}"}`;
    const mouseEnter: any = documentService.nativeDocument.createEvent('CustomEvent');
    dir.ngOnInit();
    dir.stylesEnter = hoverStyleEnter;
    dir.isHover = true;
    mouseEnter.initEvent('mouseenter', true, true);
    div.dispatchEvent(mouseEnter);
    fixture.detectChanges();

    expect(style).toEqual(JSON.stringify(inputEl[0].styles));

  });

  it('should mouse leave when isHover is true', () => {
    const dir = inputEl[0].injector.get(ZHoverDirective) as ZHoverDirective;
    const div = inputEl[0].nativeElement as HTMLDivElement;
    const hoverStyleLeave = [{ style: 'box-shadow', value: '0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.04)' },
      { style: 'position', value: 'initial' }, { style: 'cursor', value: 'initial' }];
    const style = `{"${hoverStyleLeave[0].style}":"${hoverStyleLeave[0].value}",` +
      `"${hoverStyleLeave[1].style}":"${hoverStyleLeave[1].value}","${hoverStyleLeave[2].style}":"${hoverStyleLeave[2].value}"}`;
    const mouseLeave: any = documentService.nativeDocument.createEvent('CustomEvent');
    dir.ngOnInit();
    dir.stylesLeave = hoverStyleLeave;
    dir.isHover = true;
    mouseLeave.initEvent('mouseleave', true, true);
    div.dispatchEvent(mouseLeave);
    fixture.detectChanges();

    expect(style).toEqual(JSON.stringify(inputEl[0].styles));

  });

  it('should mouse enter when isHover is false', () => {
    const dir = inputEl[0].injector.get(ZHoverDirective) as ZHoverDirective;
    const div = inputEl[0].nativeElement as HTMLDivElement;
    const mouseEnter: any = documentService.nativeDocument.createEvent('CustomEvent');
    dir.isHover = false;
    dir.breakpointMinWithoutStyles = 888;
    mouseEnter.initEvent('mouseenter', true, true);
    div.dispatchEvent(mouseEnter);
    fixture.detectChanges();

    expect(div).toBeTruthy();

  });

  it('should mouse leave when isHover is false', () => {
    const dir = inputEl[0].injector.get(ZHoverDirective) as ZHoverDirective;
    const div = inputEl[0].nativeElement as HTMLDivElement;
    const mouseLeave: any = documentService.nativeDocument.createEvent('CustomEvent');
    dir.isHover = false;
    dir.breakpointMinWithoutStyles = 888;
    mouseLeave.initEvent('mouseleave', true, true);
    div.dispatchEvent(mouseLeave);
    fixture.detectChanges();

    expect(div).toBeTruthy();

  });
});
