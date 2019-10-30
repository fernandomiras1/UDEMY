import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { ZumoColors } from '../../utils/index';

export const Size = {
  EXTRALARGE: 'extra-large',
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  VERYSMALL: 'very-small'
};

@Component({
  selector: 'z-container-icon',
  templateUrl: './container-icon.component.html',
  styleUrls: ['./container-icon.component.scss']
})
export class NGZContainerIconComponent implements OnInit {

  @Input() colorBackground: any;
  @Input() colorIcon: any;
  @Input() disabled = false;
  @Output() clickEvent = new EventEmitter<any>();

  public sizeIcon = 'size-48';
  public sizeContainerIcon = 'extra-large';
  public nameIcon: string;

  public backgroundColor: string;
  public iconColor: string;

  @Input() set size(size: string) {
    switch (size) {
      case Size.EXTRALARGE: {
        this.sizeContainerIcon = 'extra-large';
        this.sizeIcon = 'size-48';
        break;
      }
      case Size.LARGE: {
        this.sizeContainerIcon = 'large';
        this.sizeIcon = 'size-40';
        break;
      }
      case Size.MEDIUM: {
        this.sizeContainerIcon = 'medium';
        this.sizeIcon = 'size-32';
        break;
      }
      case Size.SMALL: {
        this.sizeContainerIcon = 'small';
        this.sizeIcon = 'size-24';
        break;
      }
      case Size.VERYSMALL: {
        this.sizeContainerIcon = 'very-small';
        this.sizeIcon = 'size-24';
        break;
      }
      default: {
        this.sizeContainerIcon = 'extra-large';
        this.sizeIcon = 'size-48';
        break;
      }
    }
  }

  @Input() set iconName(iconName: string) {
    this.nameIcon = iconName;
  }

  ngOnInit() {
    if (this.disabled) {
      this.backgroundColor = ZumoColors.Grayscale_300;
      this.iconColor = ZumoColors.Grayscale_400;
    } else {
      this.backgroundColor = this.colorBackground;
      this.iconColor = this.colorIcon;
    }
  }

  clickIcon() {
    this.clickEvent.emit(true);
  }
}
