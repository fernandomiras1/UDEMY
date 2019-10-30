import { Injectable } from '@angular/core';
import { IContainerIconData } from '../../container-icon/models/container-icon-data.interface';
import { Subject } from 'rxjs';
import { NGZModalDialogService } from '../../../utils/services/modal/modal-dialog.service';
import { NGZDialogComponent } from '../dialog.component';

@Injectable()
export class NGZDialogService {

  constructor(private modalService: NGZModalDialogService) { }

  showDialog(dataComponent: IDialogData, afterClose: Subject<any>): void {
    this.modalService.openDialog(NGZDialogComponent, {
      childComponent: NGZDialogComponent,
      data: dataComponent,
      onAfterClose: afterClose,
      isOverlay: true
    });
  }

  closeDialog(): void {
    this.modalService.close();
  }
}

export interface IDialogData {
  contentIcon?: IContainerIconData;
  title?: string;
  paragraph?: string;
  disabledClose?: boolean;
  actionsButtons?: IModalDialogButton[];
  onAction?: Subject<any>;
}

export interface IModalDialogButton {
  text: string;
  onAction?: Subject<any>;
  actionsButtons?: boolean;
  data?: any;
}

export const ContentIconsType = {
  WARNING: {
    iconName: 'icon-alert',
    colorIcon: '#FFFFFF',
    colorBackground: '#FFB30F'
  },
  ERROR: {
    iconName: 'icon-cross',
    colorIcon: '#FFFFFF',
    colorBackground: '#D10000'
  },
  SUCCESS: {
    iconName: 'icon-check',
    colorIcon: '#FFFFFF',
    colorBackground: '#00A67A'
  }
};
