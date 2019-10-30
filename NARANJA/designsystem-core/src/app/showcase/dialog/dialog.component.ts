import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentIconsType, IDialogData, NGZDialogService } from '../../../lib/src/components/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { ICustomDialogOptions, NGZCustomDialogService } from '../../../lib/src/components/custom-dialog';
import { PoliticaComponent } from './politica/politica.component';

@Component({
  selector: 'dsn-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  description = 'Los dialogs enfocan la atención del usuario para comunicar información, abstrayéndolo del ' +
    'resto de los elementos de la pantalla.';
  link = 'https://brandbook.naranja.com/document/248804#/componentes/dialog';
  afterCloseSubject = new Subject();

  testSubjetClicEvent = new Subject();

  public onActionAfterClose$: Observable<any>;
  outputsDocumentation = [];
  inputsDocumentation = [];
  public onActionSubscription: Subscription;
  onCloseSubject = new Subject<any>();
  onCloseSubscription: Subscription;
  info = {
    status: 'beta',
    browserSupport: {
      versionNumber: ['66+', '63+', '11.1+', '15+', '11', '50+', '5+', '5+'],
      visualSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si'],
      functionalSupport: ['Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si', 'Si']
    }
  };
  constructor(
    private dialogService: NGZDialogService,
    private customDialogService: NGZCustomDialogService) {
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
        required: 'Si',
        value: '-'
      },
      {
        name: 'closeButton',
        type: 'boolean',
        description: 'Si se muestra o no el botón para cerrar el snackbar',
        required: 'Si',
        value: '-'
      },
      {
        name: 'hasDuration',
        type: 'boolean',
        description: 'Permite activar o desactivar la duración.',
        required: 'Si',
        value: '-'
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

  ngOnInit() {

    this.onCloseSubscription = this.onCloseSubject.asObservable()
      .subscribe((data) => {
        console.log('asd');
        this.customDialogService.closeDialog();
      });

    this.onActionAfterClose$ = this.afterCloseSubject.asObservable();
    this.onActionSubscription = this.onActionAfterClose$.subscribe(() => {
    });

    this.testSubjetClicEvent.asObservable().subscribe((data) => {
    });
  }

  ngOnDestroy() {
    this.onActionSubscription.unsubscribe();
    this.onCloseSubscription.unsubscribe();
  }

  openDialogCustom(): void {
    const option: ICustomDialogOptions = {
      onActionClose: this.onCloseSubject,
      disabledClose: true
    };
    this.customDialogService.showDialog(PoliticaComponent, this.afterCloseSubject, 'Política de privacidad de Naranja', option);
  }

  openDialog(): void {
    const dialogData: IDialogData = {
      contentIcon: {
        iconName: 'icon-user',
        colorIcon: '#FFFFFF',
        colorBackground: '#FE5000'
      },
      actionsButtons: [
        {
          text: 'Ahora no',
          data: {
            id: 'tuviejaENTanga'
          }
        },
        {
          text: 'Permitir',
          data: {
            id: 'tuviejoENTanga'
          }
        }
      ],
      disabledClose: true,
      onAction: this.testSubjetClicEvent,
      title: 'Acceso a contactos',
      paragraph: 'Permitir que Naranja pueda tener acceso a mis contactos.'
    };

    this.dialogService.showDialog(dialogData, this.afterCloseSubject);
  }

  openDialogFeedback(type: string): void {
    let iconType: string;
    let backgroundColor: string;
    let iconColor: string;
    switch (type) {
      case 'error': {
        iconType = ContentIconsType.ERROR.iconName;
        backgroundColor = ContentIconsType.ERROR.colorBackground;
        iconColor = ContentIconsType.ERROR.colorIcon;
        break;
      }
      case 'warning': {
        iconType = ContentIconsType.WARNING.iconName;
        backgroundColor = ContentIconsType.WARNING.colorBackground;
        iconColor = ContentIconsType.WARNING.colorIcon;
        break;
      }
      case 'success': {
        iconType = ContentIconsType.SUCCESS.iconName;
        backgroundColor = ContentIconsType.SUCCESS.colorBackground;
        iconColor = ContentIconsType.SUCCESS.colorIcon;
        break;
      }
      default: {
        iconType = 'icon-check';
        break;
      }
    }
    const dialogData: IDialogData = {
      contentIcon: {
        iconName: iconType,
        colorBackground: backgroundColor,
        colorIcon: iconColor
      },
      actionsButtons: [
        {
          text: 'Editar',
          onAction: this.afterCloseSubject
        },
        {
          text: 'Continuar',
          onAction: this.afterCloseSubject
        }
      ],
      title: 'Faltan algunos datos',
      paragraph: 'Podríamos necesitar tu teléfono para contactarte.'
    };

    this.dialogService.showDialog(dialogData, this.afterCloseSubject);
  }

  openDialogSingle(): void {
    const dialogData: IDialogData = {
      actionsButtons: [
        {
          text: 'Entendido',
          onAction: this.afterCloseSubject
        }
      ],
      paragraph: 'Ya pagaste esta factura.'
    };

    this.dialogService.showDialog(dialogData, this.afterCloseSubject);
  }

  openDialogRegular(): void {
    const dialogData: IDialogData = {
      actionsButtons: [
        {
          text: 'Ahora no',
          onAction: this.afterCloseSubject
        },
        {
          text: 'Permitir',
          onAction: this.afterCloseSubject
        }
      ],
      paragraph: 'Permitir que Naranja pueda tener acceso a mis contactos.'
    };

    this.dialogService.showDialog(dialogData, this.afterCloseSubject);
  }

  openDialogRegularTitle(): void {
    const dialogData: IDialogData = {
      actionsButtons: [
        {
          text: 'Ahora no',
          onAction: this.afterCloseSubject
        },
        {
          text: 'Permitir',
          onAction: this.afterCloseSubject
        }
      ],
      title: 'Acceso a contactos',
      paragraph: 'Permitir que Naranja pueda tener acceso a mis contactos.'
    };

    this.dialogService.showDialog(dialogData, this.afterCloseSubject);
  }
}
