import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'z-confirmation-slider',
  templateUrl: './slider-confirmation.component.html',
  styleUrls: ['./slider-confirmation.component.scss']
})
export class NGZSliderConfirmationComponent implements OnChanges {

  @Input() text: string;
  @Input() loading = false;
  @Output() confirm = new EventEmitter<boolean>();

  public PosX = 0;
  public buzz = false;
  public imageButton: string;
  private confirmAux: boolean;
  public confirmAuxAnimation: boolean;

  ngOnChanges() {
    if (!this.loading) {
      this.PosX = 0;
      this.confirmAux = false;
    }
  }

  public onPan(event: any): void {
    if (event.deltaX > 0 && event.deltaX < 225) {
      this.PosX = event.deltaX;
    }
  }

  public onPanStop(event: any): void {
    this.PosX > 180 ? this.accept() : this.PosX = 0;
  }

  private accept(): void {
    this.confirmAux = true;
    do {
      this.PosX = this.PosX + 1;
    } while (this.PosX < 225);
    this.PosX = 225;
    this.confirm.emit(true);
  }

  feedbackMov(event) {
    if (!this.confirmAux) {
      this.confirmAuxAnimation = true;
      setTimeout(() => {
        this.confirmAuxAnimation = false;
      },         500
      );
    }
  }
}
