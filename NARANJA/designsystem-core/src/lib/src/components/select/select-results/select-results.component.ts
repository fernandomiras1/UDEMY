import {
  AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy,
  ViewChild, ElementRef, ChangeDetectorRef, Renderer2, OnChanges, RendererStyleFlags2, SimpleChanges, OnDestroy
} from '@angular/core';
import { Subject, fromEvent, Subscription } from 'rxjs';
import { NGZModalDialogService } from '../../../utils/services/modal/modal-dialog.service';
import { DocumentService } from '../../../utils/services/document/document.service';
import { IModalDialogOptions } from '../../../utils/services/modal/models/modal-dialog.interface';
import { WindowService } from '../../../utils/services/window/window.service';

@Component({
  selector: 'z-select-results',
  templateUrl: './select-results.component.html',
  styleUrls: ['./select-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NGZSelectResultsComponent implements AfterViewInit, OnInit, OnChanges, IModalDialogOptions<any>, OnDestroy {
  childComponent?: any;
  placeOnTop?: boolean;
  isOverlay?: boolean;
  @Input() selectedItems = [{ id: 0, text: '', disabled: false }];
  @Input() defaultValue = null;
  @Input() itemsCount;
  @Input() isMobile = true;
  @Input() dropUp = true;
  @Output() itemSelected = new EventEmitter<any>();
  @ViewChild('selectResults') selectResults: ElementRef;
  selectPositionY;
  isdropUp = false;
  marginBottom = 64;
  onAfterClose: Subject<any> = new Subject();
  outputData: Subject<any>;
  scrollSubscription: Subscription;
  public hoverStylesEnter = [{ style: 'background', value: '#eeeeee' }];
  public hoverStylesLeave = [{ style: 'background', value: 'none' }];
  count = 0;
  data: any;
  constructor(
    private cdRef: ChangeDetectorRef,
    private documentService: DocumentService,
    private modalService: NGZModalDialogService,
    private windowService: WindowService,
    private render: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedItems && this.dropUp) {
      if (changes.selectedItems.firstChange) {
        this.getPositionYSelect();
      }
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.detectDropUp();
      });
    }
  }

  getPositionYSelect(): void {
    const { x, y } = this.selectResults.nativeElement.getBoundingClientRect();
    this.selectPositionY = y;
  }

  ngOnInit(): void {
    if (this.isMobile) {
      this.selectedItems = this.data.selectedItems;
      this.itemsCount = this.data.itemsCount;
      this.defaultValue = this.data.defaultValue;
    }
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.isMobile) {
      this.setModalMobile();
    }

    if (this.dropUp) {
      const eventWindows = fromEvent(this.windowService.nativeWindow.window, 'scroll');
      this.scrollSubscription = eventWindows.subscribe(() => this.getPositionYSelect());
    }
  }

  detectDropUp(): void {
    const windows = this.windowService.nativeWindow;
    const windowsHeight = windows.innerHeight;
    const selectResultsHeight = this.selectResults.nativeElement.offsetHeight;

    if ((this.selectPositionY + selectResultsHeight) >= windowsHeight) {
      this.render.setStyle(this.selectResults.nativeElement, 'margin-top', `-${selectResultsHeight + this.marginBottom}px`);
    } else {
      this.render.setStyle(this.selectResults.nativeElement, 'margin-top', '8px');
    }
    this.cdRef.detectChanges();
  }

  setModalMobile(): void {
    this.documentService.nativeDocument.body.style.overflow = 'hidden';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.alignItems = 'center';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.border = '0';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.display = 'flex';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.height = 'calc(100vh + 10px)';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.justifyContent = 'center';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.left = '0%';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.overflow = 'hidden';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.position = 'fixed';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.right = '0';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.top = '-4%';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.width = '100%';
    (this.documentService.nativeDocument.querySelector('z-select-results') as HTMLElement).style.zIndex = '850';
  }

  removeModalMobile(): void {
    this.documentService.nativeDocument.body.style.overflow = 'initial';

  }

  selectedItem(item) {
    if (!item.disabled) {
      if (this.isMobile) {
        this.removeModalMobile();
        this.outputData.next(item);
        this.modalService.close();
      } else {
        this.itemSelected.emit(item);
      }
    }
  }

  clickOutside(): void {
    if (this.isMobile) {
      if (this.count === 0) {
        this.count += 1;
        return;
      }

      this.removeModalMobile();
      this.modalService.close();
      this.onAfterClose.next();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
