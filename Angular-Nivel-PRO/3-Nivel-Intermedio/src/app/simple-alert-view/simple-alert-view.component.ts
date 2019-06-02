import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-alert-view',
  templateUrl: './simple-alert-view.component.html',
  styleUrls: ['./simple-alert-view.component.scss']
})
export class SimpleAlertViewComponent implements OnInit {

  constructor() { }

  @Input() message:string;
  @Input() title:string;
  @Output() onDismiss: EventEmitter<void> = new EventEmitter<void>();
  public visible:boolean = false;

  ngOnInit() {
  }

  public dismiss(){
    this.visible = false;
    //Cuando se cierra el modal lo emitimos en el onDismiss.
    this.onDismiss.emit();
  }

  public show(){
    this.visible = true;
  }  

}
