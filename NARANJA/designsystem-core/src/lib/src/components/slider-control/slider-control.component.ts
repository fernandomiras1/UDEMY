import { Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'z-slider-control',
  templateUrl: './slider-control.component.html',
  styleUrls: ['./slider-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGZSliderControlComponent),
    multi: true
  }]
})

export class NGZSliderControlComponent implements OnInit {

  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() prefix: string;
  @Input() disabled = false;
  @Input() title: string;
  @Output() valuesChange: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('range') range: ElementRef;
  @ViewChild('label') label: ElementRef;
  public posX: number;
  public posLineX: number;
  public valueRange: number;
  private CIRCLE_WIDTH = 20;

  ngOnInit(): void {
    this.valueRange = this.min;
  }

  public inputEvent(value: number): void {
    this.valueRange = value;
    const widthLabel = this.label.nativeElement.offsetWidth;
    const widthInputPx = this.range.nativeElement.offsetWidth;
    const porcValue = ((value - this.min) * 100) / (this.max - this.min);
    this.posLineX = (widthInputPx / 100) * porcValue;
    const ballPercDiff = ((this.CIRCLE_WIDTH * 100) / widthInputPx) / 100;

    const pxValue = ((widthInputPx / 100) * (porcValue - (porcValue * ballPercDiff))) - ((widthLabel - this.CIRCLE_WIDTH) / 2);
    this.posX = pxValue >= 0 ? ((pxValue + widthLabel) > widthInputPx ? widthInputPx - widthLabel : pxValue) : 0;
  }

  public onMouseUp(value: number): void {
    if (value !== undefined) {
      this.valuesChange.emit(value);
    } else {
      this.valuesChange.emit(null);
    }
  }
}
