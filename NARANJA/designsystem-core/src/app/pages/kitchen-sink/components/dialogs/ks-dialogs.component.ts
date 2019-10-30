import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ICustomDialogOptions, NGZCustomDialogService } from '../../../../../lib/src/components/custom-dialog';
import { ContentIconsType, IDialogData, NGZDialogService } from '../../../../../lib/src/components/dialog';

import { KsCustomDialogTestComponent } from './custom-dialog/custom-dialog.component';

@Component({
  selector: 'dsn-ksdialogs',
  templateUrl: './ks-dialogs.component.html',
  styleUrls: ['./ks-dialogs.component.scss']
})
export class KsDialogsComponent {

  afterCloseSubject = new Subject();
  onCloseSubject = new Subject<any>();

  constructor(private dialogService: NGZDialogService, private customDialogService: NGZCustomDialogService) {}

  // Dialogs types

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

  openDialogCustom(): void {
    const option: ICustomDialogOptions = {
      onActionClose: this.onCloseSubject
    };
    this.customDialogService.showDialog(KsCustomDialogTestComponent, this.afterCloseSubject, 'Custom dialog test', option);
  }

}
