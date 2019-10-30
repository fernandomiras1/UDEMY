import { Subject } from 'rxjs';

export interface IModalDialogOptions<T> {
  childComponent?: any;
  data?: T;
  placeOnTop?: boolean;
  outputData?: Subject<any>;
  onAfterClose?: Subject<any>;
  isOverlay?: boolean;
}

export class ModalDialogOptions implements IModalDialogOptions<any> {
  childComponent?: any;
  data?: any;
  outputData?: Subject<any>;
  onAfterClose?: Subject<any>;
  placeOnTop?: boolean;
  isOverlay?: boolean;
}
