import { Injectable } from '@angular/core';
import { NGZModalDialogService } from '../../../utils/services/modal/modal-dialog.service';
import { NGZSnackbarComponent } from '../snackbar.component';
import { Subject } from 'rxjs';

@Injectable()
export class NGZSnackbarService {

  constructor(private modalService: NGZModalDialogService) { }

  showSnackbar(dataComponent: ISnackbarData, afterClose?: Subject<any>): void {
    this.modalService.openDialog(NGZSnackbarComponent, {
      childComponent: NGZSnackbarComponent,
      data: dataComponent,
      onAfterClose: afterClose
    });
  }

  closeSnackbar() {
    this.modalService.close();
  }
}

export interface ISnackbarData {
  text?: string;
  eventName?: string;
  isHiddenButton?: boolean;
  duration?: number;
  onEvent?: any;
  hasDuration?: boolean;
}
