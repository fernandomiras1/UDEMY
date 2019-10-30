import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISnackbarData, NGZSnackbarService } from '../../../lib/src/components/snackbar/services/snackbar.service';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'dsn-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  closeButton: boolean;
  isVisible: boolean;
  info = {
    status: 'available',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };

  title = 'Snackbar';
  description = 'Los snackbars muestran mensajes cortos acerca de procesos.';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/snackbar';
  public inputsDocumentation: any[];
  public outputsDocumentation: any[];
  public onActionAfterClose$: Observable<any>;
  public onActionAfterClose: Subject<void> = new Subject();
  public onActionSubscription: Subscription;
  public onActionAfterClose2$: Observable<any>;
  public onActionAfterClose2: Subject<void> = new Subject();
  public onActionSubscription2: Subscription;

  constructor(private snackService: NGZSnackbarService) {}

  ngOnInit() {

    this.onActionAfterClose$ = this.onActionAfterClose.asObservable();
    this.onActionSubscription = this.onActionAfterClose$.subscribe((result) => {
      this.eventDemo();
    });

    this.onActionAfterClose2$ = this.onActionAfterClose2.asObservable();
    this.onActionSubscription2 = this.onActionAfterClose2$.subscribe((result) => {
      this.eventDemo2();
    });

    this.closeButton = true;
    this.isVisible = false;

    this.inputsDocumentation = [
      {
        name: 'text',
        type: 'string',
        description: 'El texto que va a mostrar el snackbar',
        required: 'Si',
        value: '-'
      },
      {
        name: 'eventName',
        type: 'string',
        description: 'Nombre del evento que puede desencadenar el botón del snackbar',
        required: 'Si',
        value: '-'
      },
      {
        name: 'duration',
        type: 'number',
        description: 'Duración en la que el snackbar será mostrado',
        required: 'No',
        value: '3 s'
      },
      {
        name: 'hasDuration',
        type: 'boolean',
        description: 'Permite activar o desactivar la duración. Si es false nunca se cierra',
        required: 'No',
        value: 'false'
      },
      {
        name: 'isHiddenButton',
        type: 'boolean',
        description: 'Permite activar o desactivar el boton de cierre del snackbar.',
        required: 'No',
        value: 'false'
      }
    ];

    this.outputsDocumentation = [
      {
        name: 'onEvent',
        type: 'Behavior Subject',
        description: 'Sujeto que permite desencadenar alguna acción al tocar el eventName, desencadenandolo en el contexto que lo llama',
        required: 'No',
        value: '-'
      }
    ];
  }

  ngOnDestroy(): void {
    this.onActionSubscription.unsubscribe();
    this.snackService.closeSnackbar();
  }

  eventDemo() {
  }

  eventDemo2() {
    this.snackService.closeSnackbar();
  }

  displaySnackbar() {
    const dataSnackbar: ISnackbarData = {
      duration: 5,
      text: 'Se descargó tu resumen.'
    };

    this.snackService.showSnackbar(dataSnackbar, this.onActionAfterClose);
  }

  displaySnackbarDos() {
    const dataSnackbar: ISnackbarData = {
      duration: 5,
      text: 'Se descargó tu resumen de cuenta con éxito. Ya podés revisarlo y pagarlo online.',
      hasDuration: false
    };

    this.snackService.showSnackbar(dataSnackbar, this.onActionAfterClose2);
  }

  displaySnackbarTres() {
    const dataSnackbar: ISnackbarData = {
      duration: 5,
      text: 'No hay conexión a internet.',
      eventName: 'Reintentar'
    };

    this.snackService.showSnackbar(dataSnackbar, this.onActionAfterClose2);
  }

  displaySnackbarCuatro() {
    const dataSnackbar: ISnackbarData = {
      duration: 5,
      text: 'No se pudo cargar el turno en la lista. Puede que haya fallado la conexión a internet.',
      eventName: 'Reintentar'
    };

    this.snackService.showSnackbar(dataSnackbar, this.onActionAfterClose2);
  }
}
