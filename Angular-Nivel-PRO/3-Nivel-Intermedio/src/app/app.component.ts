import { Component, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
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
 
  constructor() { 
    this.timers = [3, 20, 185];
  }

  // Si tu quieres modificar el viewChild al inicio es mejor usar ngAfetConentInit,
  // ya que es el momento de inyectar contenido a la vista y  donde no se estan haciendo estos check de cambios
  ngAfterContentInit() {
    console.log(this.alert);
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
  }

  public hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert() {
    this.isEndAlertVisible = true;
  }
  
  public hideEndTimerAlert() {
    this.isEndAlertVisible = false;
  }

  public submitAddTimer() {
    this.timers.push( this.time );
    this.hideAddTimer();
  }

}
