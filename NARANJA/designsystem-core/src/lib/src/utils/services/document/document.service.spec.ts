import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentService } from './document.service';
import { PLATFORM_ID } from '@angular/core';

describe('NGZDocumentService in browser', () => {
  let service: DocumentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DocumentService, { provide: PLATFORM_ID, useValue: 'browser' }]
    });

    service = TestBed.get(DocumentService);
  }));

  it('should get nativeDocument when is browser', () => {
    const document = service.nativeDocument;

    expect(document).toBeTruthy();
  });
});

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DocumentService, { provide: PLATFORM_ID, useValue: 'wip' }]
    });

    service = TestBed.get(DocumentService);
  }));

  it('should get nativeDocument when is browser', () => {
    const document = service.nativeDocument;

    expect(document).toBeTruthy();
  });
});
