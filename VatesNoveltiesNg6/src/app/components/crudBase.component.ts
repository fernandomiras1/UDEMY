import { FormGroup, FormControl } from '@angular/forms';

import { ApplicationService } from '../services/application/application.service';
import { IAuthentication, AuthService } from 'src/app/services/auth/auth.service';

import { ModeEnum } from 'src/environments/environment';
import { CommonMessageEnum } from '../models/enums/Enums';
import { CommonMessage } from '../interfaces/Common';
import { IGridData, GridService } from 'src/app/services/ui/grid.service';

export abstract class CrudBaseComponent<T = any> {
  public componentForm: FormGroup;
  public gridItemData: IGridData<T>;
  public messageEnum: typeof CommonMessageEnum = CommonMessageEnum;
  public itemData: T;

  public todayDate = new Date();

  public submittedForm = false;
  public isSearch = false;
  public isView = false;
  public isNew = false;
  public isEdit = false;
  public _mode: ModeEnum;

  public authenticationData: IAuthentication;

  constructor() {
    this.authenticationData = AuthService.authData;
    this.gridItemData = new GridService<T>().getInstance();
  }

  // ****************************** Miembros del Componente ******************************

  public isInvalidField(field: string, form?: FormGroup): boolean {
    const currentForm = this.componentForm || form;

    return (
      (!currentForm.get(field).valid && currentForm.get(field).touched) ||
      (currentForm.get(field).untouched && this.submittedForm)
    );
  }

  // Regresa al buscador.
  public comeback(): void {
    this.itemData = null;
    ApplicationService.currentModeStatus = ModeEnum.Search;
  }

  public setMode(mode: ModeEnum): void {
    this._mode = mode;

    this.isSearch = mode === ModeEnum.Search;
    this.isView = mode === ModeEnum.View;
    this.isNew = mode === ModeEnum.New;
    this.isEdit = mode === ModeEnum.Edit;

    this.itemData = null;

    this.onModeChange(mode);
  }

  public validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public validForm(): boolean {
    let result = true;
    this.submittedForm = true;

    if (!this.componentForm.valid) {
      result = false;
      this.validateAllFormFields(this.componentForm);
    }

    return result;
  }

  // TODO: Mover a un nuevo servicio
  public commonMessage(name: CommonMessageEnum) {
    const Messages: Array<CommonMessage> = [
      {
        Key: CommonMessageEnum.LessThanZero,
        Description: 'El Valor no puede ser menor a cero.'
      },
      {
        Key: CommonMessageEnum.OnlyIntegerNumbers,
        Description: 'Sólo se permiten números enteros.'
      }
    ];

    return Messages.filter((data: CommonMessage) => data.Key === name).map(m => m.Description);
  }

  // ****************************** Miembros del Componente que se deben modificar en la Clase Hija ******************************

  public onModeChange(mode: ModeEnum): void {}

  public search(): void {}
}
