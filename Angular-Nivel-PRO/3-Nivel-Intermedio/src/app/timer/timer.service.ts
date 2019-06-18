import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// el decorador Injectable(), permite injecar servicios en el constructor
// en otras palabras puede recibir otros servicios por medio del contructor
@Injectable()
export class TimerService {

    private countdownTimerRef:any = null;
    public init:number = 0;
    public paused: boolean = true;
    // Porque no va a retornar nada por eso de tipo void
    // Subject: puede manejar mulipres subscipriciones, a demas es capas de emitir eventos
    private countdownEndSource = new Subject<void>();
    // Generamos una variabel publica, para solo escuchar los eventos solamente.
    public countdownEnd$ = this.countdownEndSource.asObservable();
    // Generamos un obs para manejar el contador.
    private countdownSource = new BehaviorSubject<number>(0);
    public countdown$ = this.countdownSource.asObservable();

    constructor() {}

    destroy():void {
        this.clearTimeout();
    }
    
      restarCountdown(init?) {

        if ( init ) this.init = init;

        if(this.init && this.init >0) {
          this.paused = true;
          this.clearTimeout();
          this.countdownSource.next(this.init);
        } 
      }
    
      toogleCountdown(){
        this.paused = !this.paused;
    
        if ( this.paused == false ) {
          this.doCountdown();
        } else {
          this.clearTimeout();
        }
      }
    
      private doCountdown(){
        this.countdownTimerRef = setTimeout(()=>{
          // con BehaviorSubject: obtenemos el ultimo valor. ( getValue())
          this.countdownSource.next( this.countdownSource.getValue() - 1);
          this.processCountdown();
        }, 1000);
      }
    
      private processCountdown(){
        if(this.countdownSource.getValue() == 0) {
          // Emitimos el evento en el Observable
          this.countdownEndSource.next();
        }
        else{
          this.doCountdown();
        }
      }
    
      private clearTimeout(){
        if(this.countdownTimerRef){
          clearTimeout(this.countdownTimerRef);
          this.countdownTimerRef = null;
        }
      }
}

