import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NGZModalDialogService } from '../../../utils/services/modal/modal-dialog.service';
import { NGZCustomDialogComponent } from '../custom-dialog.component';

@Injectable()
export class NGZCustomDialogService {

  constructor(private modalService: NGZModalDialogService) { }

  showDialog(templateComponent: any, afterClose: Subject<any>, titleDialog?: string, options?: ICustomDialogOptions): void {
    this.modalService.openDialog(NGZCustomDialogService, {
      childComponent: NGZCustomDialogComponent,
      data: {
        templateComponent,
        titleDialog,
        options
      },
      onAfterClose: afterClose,
      isOverlay: true
    });
  }

  closeDialog(): void {
    this.modalService.close();
  }
}

export interface ICustomDialogOptions {
  onActionClose: Subject<any>;
  disabledClose?: boolean;
}
