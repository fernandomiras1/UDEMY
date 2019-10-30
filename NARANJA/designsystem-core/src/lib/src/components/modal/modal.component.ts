import { Component, OnDestroy, OnInit, Input, ElementRef } from '@angular/core';
import { ModalService } from './service/modal.service';
import { DocumentService } from '../../utils/services/document/document.service';

@Component({
  selector: 'z-modal',
  template: `<div class="z-container-modal">
            <div class="z-container-modal__body">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="z-modal-background"></div>`
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(
    private modalService: ModalService, private el: ElementRef, private documentService: DocumentService
  ) {
    this.element = this.el.nativeElement;
  }

  ngOnInit() {
    // tslint:disable-next-line: no-this-assignment
    const modal = this;
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    this.documentService.nativeDocument.body.appendChild(this.element);

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    this.documentService.nativeDocument.body.classList.add('z-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    this.documentService.nativeDocument.body.classList.remove('z-modal-open');
  }
}
