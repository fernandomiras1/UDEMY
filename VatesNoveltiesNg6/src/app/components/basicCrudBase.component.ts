import { environment, ModeEnum } from '../../environments/environment';
import { ApplicationService } from '../services/application/application.service';
import { ReflectiveInjector } from '@angular/core';

export class BasicCrudBaseComponent {
  itemData: any;
  constructor() { }

  // ****************************** Miembros del Componente ******************************

 public isSearch: Boolean;
 public isView: Boolean;
 public isNew: Boolean;
 public isEdit: Boolean;
 public isDuplicate: Boolean;
 public _mode: any;

  setMode(mode) {
    this._mode = mode;
    this.isSearch = mode === ModeEnum.Search;
    this.isView = mode === ModeEnum.View;
    this.isNew = mode === ModeEnum.New;
    this.isEdit = mode === ModeEnum.Edit;

   }

  // Regresa al buscador.
  comeback() {
    //  this.setMode(ModeEnum.Search);
   // this.applicationService.changeViewStatus(ModeEnum.Search);
  }
}
