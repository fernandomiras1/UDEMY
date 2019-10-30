import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentService } from '../../utils/services/document/document.service';

@Component({
  selector: 'z-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class NGZCardComponent {
  @Input() styleList: any;
  @Input() styleListMobile: any;

  @Input() styleListBody: any;
  @Input() styleListBodyMobile: any;

  @Input() clickable = false;
  @Input() defaultStyles = true;
  @Input() isNotHover = false;
  @Input() isNotShadow = false;
  @Output() clickCard = new EventEmitter();
  breakpointMinWithoutStyles = 767;
  widthViewport = 0;

  constructor(private documentService: DocumentService) {
    this.calculateWidthViewport();
  }

  calculateWidthViewport(): void {
    this.widthViewport = this.documentService.nativeDocument.documentElement.offsetWidth;
  }

  onCardClicked(): void {
    if (this.clickable) {
      this.clickCard.emit();
    }
  }
}
