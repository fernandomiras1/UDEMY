import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { ScriptLoaderService, ScriptModel } from './script-loader.service';
import { DominoHelperService } from './domino-helper.service';
import { DocumentService } from './document.service';

describe('DominoHelperService', () => {
  let domino: DominoHelperService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        DocumentService,
        DominoHelperService,
        { provide: PLATFORM_ID, useValue: true },
      ],
    });
    domino = TestBed.get(DominoHelperService);
  }));

  it('should getDocument', () => {
    const doc = domino.getDocument();
    expect(doc).toBeTruthy();
  });

  it('should getWindow', () => {
    const wind = domino.getWindow();
    expect(wind).toBeTruthy();
  });

  it('should getBody', () => {
    const body = domino.getBody();
    expect(body).toBeTruthy();
  });

  it('should get childNodesTo body', () => {
    const nodes = domino.childNodesTo();
    expect(nodes).toBeTruthy();
  });

  it('should get childNodesTo head', () => {
    const nodes = domino.childNodesTo('head');
    expect(nodes).toBeTruthy();
  });

  it('should add element p to body', () => {
    domino.addElementTo('p');
    expect(domino.getBody().childNodes.length).toEqual(1);
  });

  it('should add element p to div', () => {
    domino.addElementTo('div');
    domino.addElementTo('p', 'div');
    expect(domino.getBody().childNodes[0].childNodes.length).toEqual(1);
  });
});
