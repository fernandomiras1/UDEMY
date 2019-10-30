import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZSliderConfirmationComponent } from './slider-confirmation.component';
import { NGZLoadingModule } from '../loading/loading.module';
import { DocumentService } from '../../utils/services/document/document.service';

describe('NGZSliderConfirmationComponent', () => {
  let component: NGZSliderConfirmationComponent;
  let fixture: ComponentFixture<NGZSliderConfirmationComponent>;
  let documentService: DocumentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NGZSliderConfirmationComponent],
      imports: [
        NGZLoadingModule
      ],
      providers: [DocumentService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZSliderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    documentService = TestBed.get(DocumentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change onpan', () => {
    const escapeEvent: any = documentService.nativeDocument.createEvent('CustomEvent');
    escapeEvent.deltaX = 225;
    component.onPan(escapeEvent);
    expect(component).toBeTruthy();
  });

  it('should change onpan deltaX is < 225', () => {
    const escapeEvent: any = documentService.nativeDocument.createEvent('CustomEvent');
    escapeEvent.deltaX = 220;
    component.onPan(escapeEvent);
    expect(component).toBeTruthy();
  });

  it('should change onStop', () => {
    const escapeEvent: any = documentService.nativeDocument.createEvent('CustomEvent');
    component.PosX = 221;
    component.onPanStop(escapeEvent);
    expect(component.PosX).toEqual(225);
  });

  it('should change onStop when PosX is < 180', () => {
    const escapeEvent: any = documentService.nativeDocument.createEvent('CustomEvent');
    component.PosX = 100;
    component.onPanStop(escapeEvent);
    expect(component.PosX).toEqual(0);
  });

  it('should change onchange when loading is true', () => {
    component.loading = true;
    component.ngOnChanges();
    expect(component.PosX).toEqual(0);
  });

  it('should change onchange when loading is false', () => {
    component.loading = false;
    component.ngOnChanges();
    expect(component.PosX).toEqual(0);
  });

  it('should change onStop false', () => {
    const escapeEvent: any = documentService.nativeDocument.createEvent('CustomEvent');
    component.PosX = 219;
    component.onPanStop(escapeEvent);
    expect(component.PosX).toEqual(225);
  });
});
