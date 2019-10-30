
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'z-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NGZListComponent implements AfterViewInit {
  @Input() index: number;
  @Input() item: any;
  @Input() disabled = false;
  @Input() clickable = true;
  @Input() notPadding = false;
  @ViewChild('box') boxList;
  @Output() elementSelected: EventEmitter<any> = new EventEmitter<any>();

  public isSecondaryText = false;
  public isPrimarySubtitle = true;
  public isRadio = false;
  public isIcon = false;
  public isLeftElement = false;
  public isRightElement = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    const leftElement = this.boxList.nativeElement.querySelectorAll('[left]');
    if (leftElement.length > 0) {
      this.isLeftElement = true;
    }

    const rightElement = this.boxList.nativeElement.querySelectorAll('[right]');
    if (rightElement.length > 0) {
      this.isRightElement = true;
    }

    const primarySubtitle = this.boxList.nativeElement.querySelectorAll('[primarySubtitle]');
    if (primarySubtitle.length > 0) {
      const subtitlePrimary = primarySubtitle[0].innerText;
      if (!subtitlePrimary) {
        this.isPrimarySubtitle = false;
      }
    }

    const secondaryTitle = this.boxList.nativeElement.querySelectorAll('[secondaryTitle]');
    if (secondaryTitle.length > 0) {
      const textSecondary = secondaryTitle[0].innerText;
      if (textSecondary) {
        this.isSecondaryText = true;
      }
    }

    const rightElementRadio = this.boxList.nativeElement.querySelectorAll('z-radiobutton');
    if (rightElementRadio.length > 0) {
      this.isRadio = true;
    }

    const rightElementCheckbox = this.boxList.nativeElement.querySelectorAll('z-checkbox');
    if (rightElementCheckbox.length > 0) {
      this.isRadio = true;
    }

    const rightElementIcon = this.boxList.nativeElement.querySelectorAll('.icon');
    if (rightElementIcon.length > 0) {
      this.isIcon = true;
    }

    this.cdr.detectChanges();
  }

  clickElement(event) {
    this.elementSelected.emit([this.index, this.item]);
  }
}
