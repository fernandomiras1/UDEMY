import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  // lo intancio aca para que cada componente tenga su propia intancia,
  // SI lo agego en el appModule, va a instanciar una sola intancia del componente. 
  providers: [TimerService],
  // usamos el changeDetection para activar la 
  // detencion de cambios solo en el compontente que estamos manipulando.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  // Genero esta subcripcion para despues eliminar las subcripciones
  private countdowEndSubscription: Subscription = null;
  private countdowSubscription: Subscription = null;
  public countdow: number = 0;

  constructor(public timerService: TimerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
   this.timerService.restarCountdown(this.init);

   this.countdowEndSubscription = this.timerService.countdownEnd$.subscribe(() => {
    this.onComplete.emit();
   });

   this.countdowSubscription = this.timerService.countdown$.subscribe( (value: number) => {
      this.countdow = value;
      // tiene que comprobar cambios en el componente.
      this.cdRef.markForCheck();
   });

  }

  // get: sirve para definir el metodo de acceso a una propiedad 
  get progress() {
    console.log('get progress');
    return ( this.init - ( this.countdow )) / this.init*100;
  }

  ngOnDestroy():void{
    this.timerService.destroy();
    // Rompemo la subcripcion
    this.countdowEndSubscription.unsubscribe();
    this.countdowSubscription.unsubscribe();
  }

}
