import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { By } from '@angular/platform-browser';
import { LazysizespictureDirective } from './lazysizespicture.directive';
import { DocumentService } from '@core/utils/services/document.service';
import { NavigatorService } from '@core/utils/services/navigator.service';

@Component({
  template: `<img [appDatasrcset]="'fake'" style="width: 100px;">`,
})
class TestLazySizesComponent {
}

const navigator = {
  isMobile: true,
  isBrowser: true,
};

describe('LazysizespictureDirective is mobile and browser', () => {
  let component: TestLazySizesComponent;
  let fixture: ComponentFixture<TestLazySizesComponent>;
  let element: DebugElement[];
  let documentService: DocumentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DocumentService, { provide: NavigatorService, useValue: navigator }],
      imports: [SharedModule],
      declarations: [TestLazySizesComponent],
    });

    fixture = TestBed.createComponent(TestLazySizesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.queryAll(By.directive(LazysizespictureDirective));
    documentService = TestBed.get(DocumentService);
  }));

  it('should add width 400px', () => {
    const dir = element[0].injector.get(LazysizespictureDirective) as LazysizespictureDirective;
    const div = element[0].nativeElement as HTMLImageElement;
    dir.ngOnInit();
    fixture.detectChanges();
    expect(div.dataset.srcset).toEqual('fake?fm=webp&fit=scale&w=400');
  });
});

const navigatorService = {
  isMobile: false,
  isBrowser: true,

};

describe('LazysizesDirective is not mobile', () => {
  let component: TestLazySizesComponent;
  let fixture: ComponentFixture<TestLazySizesComponent>;
  let element: DebugElement[];
  let documentService: DocumentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DocumentService, { provide: NavigatorService, useValue: navigatorService }],
      imports: [SharedModule],
      declarations: [TestLazySizesComponent],
    });

    fixture = TestBed.createComponent(TestLazySizesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.queryAll(By.directive(LazysizespictureDirective));
    documentService = TestBed.get(DocumentService);
  }));

  it('should add quality 70 of image', () => {
    const dir = element[0].injector.get(LazysizespictureDirective) as LazysizespictureDirective;
    const div = element[0].nativeElement as HTMLImageElement;
    dir.ngOnInit();
    fixture.detectChanges();
    expect(div.dataset.srcset).toEqual('fake?fm=webp&q=70');
  });
});

const navigatorService2 = {
  isMobile: false,
  isBrowser: false,

};

describe('LazysizesDirective is not browser', () => {
  let component: TestLazySizesComponent;
  let fixture: ComponentFixture<TestLazySizesComponent>;
  let element: DebugElement[];
  let documentService: DocumentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DocumentService, { provide: NavigatorService, useValue: navigatorService2 }],
      imports: [SharedModule],
      declarations: [TestLazySizesComponent],
    });

    fixture = TestBed.createComponent(TestLazySizesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.queryAll(By.directive(LazysizespictureDirective));
    documentService = TestBed.get(DocumentService);
  }));

  it('should not add srcset', () => {
    const dir = element[0].injector.get(LazysizespictureDirective) as LazysizespictureDirective;
    const div = element[0].nativeElement as HTMLImageElement;
    dir.ngOnInit();
    fixture.detectChanges();
    expect(div.dataset.srcset).toBeUndefined();
  });
});
