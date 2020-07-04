import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService } from './services/window.service';
import { DocumentService } from './services/document.service';
import { LocalStorageWrapper } from './services/local-storage-wrapper.service';

export const WINDOW = new InjectionToken('tn-util-window');
export const LOCAL_STORAGE = new InjectionToken('tn-util-local-storage');
export const DOCUMENT = new InjectionToken('tn-util-document');

export function windowFactory(windowService: WindowService) {
  return windowService.nativeWindow;
}

export function documentFactory(documentService: DocumentService) {
  return documentService.nativeDocument;
}

export function localStorageFactory(localStorageWrapper: LocalStorageWrapper) {
  return localStorageWrapper.localStorage;
}

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  providers: [
    WindowService,
    DocumentService,
    LocalStorageWrapper,
    { provide: WINDOW, useFactory: windowFactory, deps: [WindowService] },
    { provide: LOCAL_STORAGE, useFactory: localStorageFactory, deps: [LocalStorageWrapper] },
    { provide: DOCUMENT, useFactory: documentFactory, deps: [DocumentService] },
  ],
})
export class CoreUtilModule {}
