import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {
  
  @Input() init: number = null;
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();
  // Este va a ser nuestro contadro real que va a tener.
  public counter: number = 0;
  private countdownTimeRef: any = null;
  
  constructor() { }

  ngOnChanges(changes): void {
    console.log('init value update to:  ', changes.init.currentValue);
    this.startCountdown();
  }
  
  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    if ( this.init && this.init > 0 ) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }
  // dismimuye nuestra cuenta atras
  doCountdown() {
    this.countdownTimeRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }

  private clearTimeout() {
    if ( this.countdownTimeRef ) {
      clearTimeout(this.countdownTimeRef);
      this.countdownTimeRef = null;
    } 
  }

  // Verifica si continua o termina el contador
  processCountdown() {
    this.onDecrease.emit( this.counter );
    console.log('cuenta', this.counter );
    if ( this.counter == 0 ) {
      this.onComplete.emit();
      console.log('termino');
    } else {
      // llamamos de nuevo al contador
      this.doCountdown();
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

}
