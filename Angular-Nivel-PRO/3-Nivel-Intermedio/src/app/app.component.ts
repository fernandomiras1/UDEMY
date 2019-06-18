import { Component, ViewChild, AfterViewInit, AfterContentInit, ViewContainerRef, 
  ComponentFactoryResolver, ComponentRef, ElementRef} from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit{
  public isAddTimerVisible: boolean = false;
  public isEndAlertVisible: boolean = false; 
  public time: number = 0;
  public timers: Array<number> = [];
  @ViewChild( SimpleAlertViewComponent ) alert: SimpleAlertViewComponent;
  // Referencia a mi alert Dinamico.
  // ViewContainerRef: me permite crear contendio Dinamico
  @ViewChild('alertDinamico', {read: ViewContainerRef}) alertContainer: ViewContainerRef;
  public simpleAlert: ComponentRef<SimpleAlertViewComponent> = null; 

  // ElementRef
  @ViewChild('timeInput') timeInput: ElementRef;
  // ComponentFactoryResolver; me permite crear componentes dinamicos.
  constructor(private resolver: ComponentFactoryResolver) { 
    this.timers = [3, 20, 185];
  }

  // Si tu quieres modificar el viewChild al inicio es mejor usar ngAfetConentInit,
  // ya que es el momento de inyectar contenido a la vista y  donde no se estan haciendo estos check de cambios
  ngAfterContentInit() {
    console.log(this.timeInput);
    this.timeInput.nativeElement.setAttribute('placeholder', 'enter seconds');
    this.timeInput.nativeElement.classList.add('time-in');
    // podemos manipular sus variables
    this.alert.show();
    this.alert.title = 'Hi';
    this.alert.message = 'Hello world';
  }

  logCountdowEnd() {
    console.log('-countdown End--');
  }

  public showAddTimer() {
    this.isAddTimerVisible = true;
    // Hacemos focus sobre el input cuando se abre.
    setTimeout(()=>{this.timeInput.nativeElement.focus();});
  }

  public hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  // Mostramos el Componente Dinamico en este caso el Alert
  public showEndTimerAlert() {
    //this.isEndAlertVisible = true;

    // Fabricamos en Componente Dinamico ( MODAL )
    const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
    this.simpleAlert = this.alertContainer.createComponent(alertFactory);
    // Agregamos el contendio del modal
    this.simpleAlert.instance.title = 'timer ended';
    this.simpleAlert.instance.message = 'your countdown has finished';
    this.simpleAlert.instance.onDismiss.subscribe( () => {
      console.log('se cerro el Modal. y lo campatamos al evento');
      // cuando se cierra el modal, destruimos el modal Dinamico
      this.simpleAlert.destroy();
    });
    console.log( this.simpleAlert.instance );
    this.simpleAlert.instance.show();
  }
  
  public hideEndTimerAlert() {
    this.isEndAlertVisible = false;
  }

  public submitAddTimer() {
    this.timers.push( this.time );
    this.hideAddTimer();
  }

}
