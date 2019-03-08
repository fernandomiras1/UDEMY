import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, ModeEnum } from '../../../environments/environment';
import { NoveltyListModel, NoveltyBindingModel } from '../../models/entities/NoveltyDTO';
import { INoveltyBindingModel, INoveltyManagerFilter, INoveltyEdit } from '../../models/entities/Abstracts/INoveltyDTO';
import { IDialogNovely } from '../../models/ui/DialogData';
import { PromptDialogComponent } from 'src/app/components/ui/prompt-dialog/prompt-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DetailsComponent } from 'src/app/components/novelties/details/details.component';
import { SearchComponent } from 'src/app/components/novelties/search/search.component';
import { isNullOrUndefined } from 'util';
import { MessageDialogComponent } from 'src/app/components/ui/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NoveltiesService {
  _baseUrl = environment.novApiUrl;
  _url = this._baseUrl + 'api/novelties';
  constructor(public http: HttpClient) {}

  getByFilters(filtersData: INoveltyManagerFilter, pageNumber: number): Observable<NoveltyListModel> {
    const url = this._url + '/search';

    return this.http.post<NoveltyListModel>(url, {
      filters: filtersData,
      pageNumber: pageNumber
    });
  }

  create(itemData: INoveltyBindingModel): Observable<NoveltyBindingModel[]> {
    const url = this._url + '/add';

    return this.http.post<NoveltyBindingModel[]>(url, itemData);
  }

  edit(editItem: INoveltyEdit): Observable<any[]> {
    const url = this._url + '/';
    return this.http.put<any[]>(url, editItem);
  }

  // GetById Novelty
  get(id: number): Observable<NoveltyBindingModel> {
    const url = this._url + '/' + id;

    return this.http.get<NoveltyBindingModel>(url);
  }
  // Rechazar una Novedad
  reject(item: IDialogNovely): Observable<any> {
    const url = this._url + '/reject';

    return this.http.post<any>(url, item);
  }

  // Aprobar una Novedad
  approve(item: IDialogNovely): Observable<any> {
    const url = this._url + '/approve';

    return this.http.post<any>(url, item);
  }

  delete(id: number): Observable<any> {
    const url = this._url + '/' + id;

    return this.http.delete<any>(url);
  }

  // Aprobar Novedad Administración
  approveAdm(item: IDialogNovely): Observable<any> {
    const url = this._url + '/approveAdm';

    return this.http.post<any>(url, item);
  }

  public observeAdm(item: IDialogNovely): Observable<any> {
    const url = this._url + '/observeAdm';

    return this.http.post<any>(url, item);
  }
}

@Injectable()
export class NoveltyUIService extends NoveltiesService {
  private currentComponent: DetailsComponent | SearchComponent;

  constructor(public http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) {
    super(http);
  }

  public openRejectDialog(id: number): void {
    this.verifyCurrentComponent();

    const dialogRef = this.dialog.open(PromptDialogComponent, {
      width: '350px',
      data: {
        title: 'Advertencia',
        message: '¿ Está seguro que desea Rechazar la Novedad ?',
        inputPlaceholder: 'Motivo de Rechazo'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        super.reject({ id: id, comments: result }).subscribe(() => {
          this.snackBar.open('Novedad Rechazada Correctamente', 'Aceptar', {
            duration: 5000
          });

          if (this.currentComponent._mode === ModeEnum.Search) {
            this.currentComponent.search();
          } else {
            this.currentComponent.comeback();
          }
        }, () => {
          this.snackBar.open('Error al Rechazar la Novedad', 'Aceptar', {
            duration: 5000
          });
        }
        );
      }
    });
  }

  public approveNovelty(id: number): void {
    this.verifyCurrentComponent();

    if (id) {
      super.approve({id: id}).subscribe(
        () => {
          this.snackBar.open('Novedad Aprobada Correctamente', 'Aceptar', {
            duration: 5000
          });

          if (this.currentComponent._mode === ModeEnum.Search) {
            this.currentComponent.search();
          } else {
            this.currentComponent.comeback();
          }
        },
        () => {
          this.snackBar.open('Error al Aprobar la Novedad', 'Aceptar', {
            duration: 5000
          });
        }
      );
    }
  }

  public approveAdmNovelty(id: number): void {
    this.verifyCurrentComponent();

    if (id) {
      super.approveAdm({id: id}).subscribe(
        () => {
          this.snackBar.open('Novedad Aprobada Correctamente', 'Aceptar', {
            duration: 5000
          });

          if (this.currentComponent._mode === ModeEnum.Search) {
            this.currentComponent.search();
          } else {
            this.currentComponent.comeback();
          }
        },
        () => {
          this.snackBar.open('Error al Aprobar la Novedad', 'Aceptar', {
            duration: 5000
          });
        }
      );
    }
  }

  public openObserveDialog(id: number): void {
    this.verifyCurrentComponent();

    const dialogRef = this.dialog.open(PromptDialogComponent, {
      width: '350px',
      data: {
        title: 'Advertencia',
        message: '¿ Está seguro que desea Observar la Novedad ?',
        inputPlaceholder: 'Motivo de Observación'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResponse => {
      if (dialogResponse) {
        const dialogNovelty: IDialogNovely = {
          id: id,
          comments: String(dialogResponse)
        };

        super.observeAdm(dialogNovelty).subscribe(
          () => {
            this.snackBar.open('Novedad Observada Correctamente', 'Aceptar', {
              duration: 5000
            });

            if (this.currentComponent._mode === ModeEnum.Search) {
              this.currentComponent.search();
            } else {
              this.currentComponent.comeback();
            }
          },
          () => {
            this.snackBar.open('Error al Observar la Novedad', 'Aceptar', {
              duration: 5000
            });
          }
        );
      }
    });
  }

  public deleteNovelty(id: number): void {
    this.verifyCurrentComponent();

    const dialogMessageRef = this.dialog.open(MessageDialogComponent, {
      width: '450px',
      data: {
        message: '¿Esta seguro que desea eliminar la Novedad?',
        title: 'Advertencia',
        btnButton: 'Eliminar'
      }
    });

    dialogMessageRef.afterClosed().subscribe(result => {
      if (result) {
        super.delete(id).subscribe(
          () => {
            this.snackBar.open('Novedad Eliminada Correctamente', 'Aceptar', {
              duration: 5000
            });

            if (this.currentComponent._mode === ModeEnum.Search) {
              this.currentComponent.search();
            } else {
              this.currentComponent.comeback();
            }
          },
          () => {
            this.snackBar.open('Error al Eliminar la Novedad', 'Aceptar', {
              duration: 5000
            });
          }
        );
      }
    });
  }

  public initialize(component: DetailsComponent | SearchComponent): void {
    this.currentComponent = component;
  }

  private verifyCurrentComponent(): void {
    if (isNullOrUndefined(this.currentComponent)) {
      throw new Error('No se ha intanciado el componente actual.');
    }
  }
}
