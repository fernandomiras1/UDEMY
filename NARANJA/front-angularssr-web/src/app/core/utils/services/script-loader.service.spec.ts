import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { ScriptLoaderService, ScriptModel } from './script-loader.service';
import { DominoHelperService } from './domino-helper.service';
import { DocumentService } from './document.service';

describe('ScriptLoaderService', () => {
  let service: ScriptLoaderService;
  let doc: DocumentService;
  let domino: DominoHelperService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ScriptLoaderService,
        DocumentService,
        DominoHelperService,
        { provide: PLATFORM_ID, useValue: true },
      ],
    });

    service = TestBed.get(ScriptLoaderService);
    doc = TestBed.get(DocumentService);
    domino = TestBed.get(DominoHelperService);
  }));

  it('should add script in head', () => {

    const script: ScriptModel = {
      name: null,
      src: '/assets/js/zepto.js',
      loaded: false,
      htmlParentElement: 'head',
    };
    const scriptLoader = service.load(script).subscribe();

    expect(scriptLoader).toBeTruthy();
  });

  it('should add existing script in head', () => {

    const script: ScriptModel = {
      name: 'zepto',
      src: '/assets/js/zepto.js',
      loaded: true,
      htmlParentElement: 'head',
    };
    service['scripts'].push(script);
    service.load(script).subscribe();

    expect(service).toBeTruthy();
  });
});
