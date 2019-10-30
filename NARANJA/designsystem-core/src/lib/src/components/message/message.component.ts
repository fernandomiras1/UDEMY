import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { WindowService } from '../../utils/services/window/window.service';

@Component({
  selector: 'z-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class NGZMessageComponent implements AfterViewInit {
  @Input() text = '';
  @Input()
  set type(type: string) {

    switch (type) {
      case 'success': {
        this.typeColor = 'success';
        break;
      }
      case 'warning': {
        this.typeColor = 'warning';
        break;
      }
      case 'error': {
        this.typeColor = 'error';
        break;
      }
      default: {
        this.typeColor = 'success';
        break;
      }
    }
  }
  typeColor = 'success';
  isTwoLines = false;
  @ViewChild('textMessage') textMessage: ElementRef;

  constructor(private cdr: ChangeDetectorRef, private windowService: WindowService) {

  }

  ngAfterViewInit() {
    const styles = this.windowService.nativeWindow.getComputedStyle(this.textMessage.nativeElement);

    if (styles && this.westernArabicNumeralsOnly(styles.height) >= 24) {
      this.isTwoLines = true;
    }
    this.cdr.detectChanges();
  }

  westernArabicNumeralsOnly(style: string): number {
    return style !== null ? style.match(/\d+/g).map(Number)[0] : null;
  }

  getAlertClassBy(type) {
    return  this.typeColor === type ? `z-message-${type}` : null;
  }

}
