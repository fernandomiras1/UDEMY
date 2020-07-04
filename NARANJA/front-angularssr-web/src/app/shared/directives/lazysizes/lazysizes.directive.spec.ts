import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared.module';
import { By } from '@angular/platform-browser';
import { LazysizesDirective } from './lazysizes.directive';
import { DocumentService } from '@core/utils/services/document.service';
import { NavigatorService } from '@core/utils/services/navigator.service';

@Component({
  template: `<img appDatasrc style="width: 100px;">`,
})
class TestLazySizesComponent {
}

const navigatorServiceGoogleBot = {
  isGoogleBot: true,
};

describe('LazysizesDirective without googlebot', () => {
  let component: TestLazySizesComponent;
  let fixture: ComponentFixture<TestLazySizesComponent>;
  let element: DebugElement[];
  let documentService: DocumentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DocumentService, { provide: NavigatorService, useValue: navigatorServiceGoogleBot }],
      imports: [SharedModule],
      declarations: [TestLazySizesComponent],
    });

    fixture = TestBed.createComponent(TestLazySizesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.queryAll(By.directive(LazysizesDirective));
    documentService = TestBed.get(DocumentService);
  }));

  it('should add data-src attribute if is googlebot', () => {
    const dir = element[0].injector.get(LazysizesDirective) as LazysizesDirective;
    const div = element[0].nativeElement as HTMLImageElement;
    dir.ngOnInit();
    expect(div.src).toBeTruthy();
  });
});

const navigatorService = {
  isGoogleBot: false,
};

describe('LazysizesDirective without googlebot', () => {
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
    element = fixture.debugElement.queryAll(By.directive(LazysizesDirective));
    documentService = TestBed.get(DocumentService);
  }));

  it('should add data-src attribute if is not googlebot', () => {
    const dir = element[0].injector.get(LazysizesDirective) as LazysizesDirective;
    const div = element[0].nativeElement as HTMLImageElement;
    dir.ngOnInit();
    expect(div.src).toBeFalsy();
  });
});
