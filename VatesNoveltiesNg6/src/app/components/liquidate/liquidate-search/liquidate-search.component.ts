import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonOpts } from 'mat-progress-buttons';
import {
  IAuthentication,
  AuthService
} from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/entities/employee.service';
import { PmsService } from 'src/app/services/entities/pms.service';
import { ProjectsService } from 'src/app/services/entities/projects.service';
import { ClientService } from 'src/app/services/entities/client.service';
import { ManagersService } from 'src/app/services/entities/managers.service';
import { ApplicationService, MY_FORMATS } from 'src/app/services/application/application.service';
import { ButtonService } from 'src/app/services/ui/buttons.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatDatepicker,
  MAT_DATE_FORMATS,
  MatDialog,
  MatPaginator
} from '@angular/material';
import { SalaryToPayStatusEnum } from 'src/app/models/enums/Enums';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { debounceTime } from 'rxjs/operators';
import { CrudBaseComponent } from '../../crudBase.component';
import { FileUploadDialogComponent } from '../../ui/file-upload-dialog/file-upload-dialog.component';
import { SalaryToPayService } from 'src/app/services/salary-to-pay/salary-to-pay.service';
import { ISalaryToPayFilterData, SalaryToPayListModel, SalaryToPayItems } from 'src/app/models/entities/SalaryToPayDTOs';
import { PromptDialogComponent } from 'src/app/components/ui/prompt-dialog/prompt-dialog.component';
import { IDialogNovely } from 'src/app/models/ui/DialogData';
import { MessageDialogComponent } from '../../ui/message-dialog/message-dialog.component';
import { IExcelDownload, FileService } from 'src/app/services/common/file.service';
import { ValidationsHelperService } from '../../../services/common/validationsHelper.service';
const moment = _moment;

@Component({
  selector: 'app-liquidate-search',
  templateUrl: './liquidate-search.component.html',
  styleUrls: ['./liquidate-search.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class LiquidateSearchComponent extends CrudBaseComponent<SalaryToPayItems> implements OnInit {
  // ****************************** Constructor del Componente ******************************
  public authenticationData: IAuthentication;
  constructor(
    private route: Router,
    private salaryToPayService: SalaryToPayService,
    private employeeService: EmployeeService,
    private pmsService: PmsService,
    private projectsService: ProjectsService,
    private clientService: ClientService,
    private managersService: ManagersService,
    private appService: ApplicationService,
    private buttonService: ButtonService,
    public  validationsService: ValidationsHelperService,
    private fb: FormBuilder,
    private fileService: FileService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    super();
    this.authenticationData = AuthService.authData;
  }
  // ****************************** Miembros del Componente ******************************
  formSearch: FormGroup;
  spinnerButtonSearch: ButtonOpts;
  spinnerBtnSalaryToPay: ButtonOpts;
  spinnerBtnSalaryToReconcile: ButtonOpts;
  spinnerButtonExcel: ButtonOpts;
  public filtersData: ISalaryToPayFilterData;
  pageNumber = 0;
  isLoadingAutoResource = false;
  isLoadingAutoProject = false;
  isLoadingAutoClient = false;
  isLoadingResults = false;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  // Combos - Autocomeple
  listPms: any;
  listProjects: any;
  listResource: any;
  listClients: any;
  listReviser: any;
  listStatus: any;
  listTypes: any;
  // Enum
  statusEnum: typeof SalaryToPayStatusEnum = SalaryToPayStatusEnum;
  // ****************************** Funciones del Privadas ******************************
  ngOnInit() {
    this.createFormSearch();
    this.bindDDLs();
    this.hasPermission();
    this.SpinnerButton();
    this.initializeGridOptions();
  }

  SpinnerButton(): void {
    this.spinnerButtonSearch = this.buttonService.spinnerButton(
      'Buscar',
      22,
      'primary',
      'primary'
    );
    this.spinnerBtnSalaryToPay = this.buttonService.spinnerButton(
      'Liquidar Filtrados',
      22,
      'primary',
      'primary'
    );
    this.spinnerBtnSalaryToReconcile = this.buttonService.spinnerButton(
      'Conciliar Filtrados',
      22,
      'primary',
      'primary'
    );
    this.spinnerButtonExcel = this.buttonService.spinnerButton(
      'Exportar',
      22,
      'primary',
      'primary'
    );
  }

  hasPermission(): void {
    if (!this.authenticationData.permissions.SueldoCruceroConsulta) {
      this.route.navigate(['/home']);
    }
  }

  private initializeGridOptions(): void {
    this.gridItemData.displayedColumns = [
      'Month',
      'Cuit',
      'EmployeeName',
      'ToPayNetSalary',
      'CruisingNetSalary',
      'PreviousNetSalary',
      'IncomeTaxRetention',
      'DiffWithPreviousSalary',
      'DiffWithCruisingSalary',
      'NoveltyTypes',
      'AdministrationComments',
      'AdditionalInformation',
      'Justification',
      'StatusDescription',
      'actions'
    ];
  }


  createFormSearch() {
    this.formSearch = this.fb.group({
      DateFrom: [moment()],
      DateTo: [moment()],
      employee: [null],
      managerId: [null],
      pmId: [
        {
          value: null,
          disabled: !this.authenticationData.permissions.SeleccionaPM
        }
      ],
      typeId: [null],
      statusId: [null],
      client: [null],
      project: [null],
      withNovelty: [null],
      minDiffWithCruisingSalary: [null, [Validators.max(99999), Validators.pattern(this.validationsService.regularExpressions.onlyIntegerNumbers)]],
      maxDiffWithCruisingSalary: [null, [Validators.max(99999), Validators.pattern(this.validationsService.regularExpressions.onlyIntegerNumbers)]],
      minDiffWithPreviousMonth: [null, [Validators.max(99999), Validators.pattern(this.validationsService.regularExpressions.onlyIntegerNumbers)]],
      maxDiffWithPreviousMonth: [null, [Validators.max(99999), Validators.pattern(this.validationsService.regularExpressions.onlyIntegerNumbers)]]
    });
  }

  btnSearch(isPager: boolean) {
    if (!isPager) {
      this.paginator.firstPage();
      this.spinnerButtonSearch.active = true;
    }
    this.bindFiltersData();
    this.salaryToPayService
      .getByFilters(
        this.filtersData,
        this.paginator ?  this.paginator.pageIndex + 1 : 1
      )
      .subscribe((response: SalaryToPayListModel) => {
        if (response) {
           this.gridItemData.dataSource.data = response.items;
           this.gridItemData.resultCount = response.items_count;
          if (!isPager) {
            this.spinnerButtonSearch.active = false;
          }
        }
      });
  }

  btnSalaryToPay(): void {
    this.bindFiltersData();
    this.filtersData.StatusId = this.statusEnum.Reconciled;
    this.spinnerBtnSalaryToPay.active = true;
    this.salaryToPayService.getTotalByFilters(this.filtersData).subscribe((total: number) => {
    if (total > 0) {
      const dialogMessageRef = this.dialog.open(MessageDialogComponent, {
        width: '500px',
        data: {
          message: '¿ Está seguro que desea liquidar los ' + total + ' registros filtrados ?',
          title: 'Advertencia',
          btnButton: 'Liquidar'
        }
      });

      dialogMessageRef.afterClosed().subscribe(result => {
          if (result) {
           this.salaryToPayService.salaryToPayByFilters(this.filtersData).subscribe(
              () => {
                this.snackBar.open('Los registros se liquidarón correctamente', 'Aceptar', {
                  duration: 5000
                });
                this.btnSearch(true);
              },
              () => {
                this.snackBar.open('Error al liquidar los registros', 'Aceptar', {
                  duration: 5000
                });
              }
            );
          }
        });
      } else {
        this.snackBar.open('No hay registros para liquidar', 'Aceptar', {
          duration: 5000
        });
      }
      this.spinnerBtnSalaryToPay.active = false;
    });
  }


  btnSalaryToReconcile(): void {
    this.bindFiltersData();
    this.filtersData.StatusId = this.statusEnum.Imported;
    this.spinnerBtnSalaryToReconcile.active = true;
    this.salaryToPayService.getTotalByFilters(this.filtersData).subscribe((total: number) => {
    if (total > 0) {
      const dialogMessageRef = this.dialog.open(MessageDialogComponent, {
        width: '500px',
        data: {
          message: '¿ Está seguro que desea conciliar los ' + total + ' registros filtrados ?',
          title: 'Advertencia',
          btnButton: 'Conciliar'
        }
      });

      dialogMessageRef.afterClosed().subscribe(result => {
          if (result) {
           this.salaryToPayService.reconcileByFilters(this.filtersData).subscribe(
              () => {
                this.snackBar.open('Los registros se conciliaron correctamente', 'Aceptar', {
                  duration: 5000
                });
                this.btnSearch(true);
              },
              () => {
                this.snackBar.open('Error al conciliar los registros', 'Aceptar', {
                  duration: 5000
                });
              }
            );
          }
        });
      } else {
        this.snackBar.open('No hay registros para conciliar', 'Aceptar', {
          duration: 5000
        });
      }
      this.spinnerBtnSalaryToReconcile.active = false;
    });
  }

  getName(item: any) {
    return item.FirstName + ' ' + item.LastName;
  }

  bindDDLs() {
    // GetPms
    this.pmsService.getPms().subscribe(response => {
      this.listPms = response;
      if (!this.authenticationData.permissions.SeleccionaPM) {
        this.listPms.some(element => {
          if (this.authenticationData.userFile === element.Id) {
            this.formSearch
              .get('pmId')
              .setValue(this.authenticationData.userFile);
          }
        });
      }
    });
    // GetReviser
    this.managersService.getManagers().subscribe(response => {
      this.listReviser = response;
      this.listReviser.some(element => {
        if (this.authenticationData.userFile === element.Id) {
          this.formSearch
            .get('managerId')
            .setValue(this.authenticationData.userFile);
        }
      });
    });
    // GetStatus
    this.appService.getLiquidateStatus().subscribe(response => {
      this.listStatus = response;
    });
    // GetTypes
    this.appService.getNoveltyTypes().subscribe(response => {
      this.listTypes = response;
    });
    // Recurso - Autocomeplete
    this.formSearch
      .get('employee')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(data => {
        if (data.length >= this.appService.maxLengthAutoComplete) {
          this.isLoadingAutoResource = true;
          this.employeeService.getEmployee(data).subscribe((resu: any) => {
            this.listResource = resu;
            this.isLoadingAutoResource = false;
          });
        }
      });
    // Proyectos - Autocomeplete
    this.formSearch
      .get('project')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(data => {
        if (data.length >= this.appService.maxLengthAutoComplete) {
          this.isLoadingAutoProject = true;
          this.projectsService.getProjects(data).subscribe((response: any) => {
            this.listProjects = response;
            this.isLoadingAutoProject = false;
          });
        }
      });
    // Clientes - Autocomeplete
    this.formSearch
      .get('client')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(data => {
        if (data.length >= this.appService.maxLengthAutoComplete) {
          this.isLoadingAutoClient = true;
          this.clientService.getClient(data).subscribe((response: any) => {
            this.listClients = response;
            this.isLoadingAutoClient = false;
          });
        }
      });
  }

  // ****************************** Funciones del Display Autocomplete ******************************
  displayResource(item): string {
    return item ? item.FirstName + ' ' + item.LastName : item;
  }

  displayProject(item): string {
    return item ? item.Name : item;
  }

  displayClient(item): string {
    return item ? item.Name : item;
  }

  // Componentes para DataPicker - Period From
  chosenYearHandlerDateFrom(normalizedYear: Moment) {
    const ctrlValue = this.formSearch.get('DateFrom').value;
    ctrlValue.year(normalizedYear.year());
    this.formSearch.get('DateFrom').setValue(ctrlValue);
  }

  chosenMonthHandlerDateFrom(
    normlizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.formSearch.get('DateFrom').value;
    ctrlValue.month(normlizedMonth.month());
    this.formSearch.get('DateFrom').setValue(ctrlValue);
    datepicker.close();
  }

  // Componentes para DataPicker - Period To (dpDateTo)

  chosenYearHandlerDateTo(normalizedYear: Moment) {
    const ctrlValue = this.formSearch.get('DateTo').value;
    ctrlValue.year(normalizedYear.year());
    this.formSearch.get('DateTo').setValue(ctrlValue);
  }
  chosenMonthHandlerDateTo(
    normlizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.formSearch.get('DateTo').value;
    ctrlValue.month(normlizedMonth.month());
    this.formSearch.get('DateTo').setValue(ctrlValue);
    datepicker.close();
  }

  getNext() {
    this.btnSearch(true);
  }

  private bindFiltersData(): void {
    this.filtersData = {
      FromMonth: moment(this.formSearch.get('DateFrom').value).month() + 1,
      FromYear: moment(this.formSearch.get('DateFrom').value).year(),
      UntilMonth: moment(this.formSearch.get('DateTo').value).month() + 1,
      UntilYear: moment(this.formSearch.get('DateTo').value).year(),
      EmployeeId: this.formSearch.get('employee').value
        ? this.formSearch.get('employee').value.Id
        : 0,
      ProjectId: this.formSearch.get('project').value
        ? this.formSearch.get('project').value.Id
        : 0,
      ClientId: this.formSearch.get('client').value
        ? this.formSearch.get('client').value.Id
        : 0,
      PmId: this.formSearch.get('pmId').value
        ? this.formSearch.get('pmId').value
        : 0,
      ManagerId: this.formSearch.get('managerId').value
        ? this.formSearch.get('managerId').value
        : 0,
      StatusId: this.formSearch.get('statusId').value
        ? this.formSearch.get('statusId').value
        : 0,
      TypeId: this.formSearch.get('typeId').value
        ? this.formSearch.get('typeId').value
        : 0,
      WithNovelty: this.formSearch.get('withNovelty').value,
      MinDiffWithCruisingSalary: this.formSearch.get('minDiffWithCruisingSalary').value,
      MaxDiffWithCruisingSalary: this.formSearch.get('maxDiffWithCruisingSalary').value,
      MinDiffWithPreviousMonth: this.formSearch.get('minDiffWithPreviousMonth').value,
      MaxDiffWithPreviousMonth: this.formSearch.get('maxDiffWithPreviousMonth').value
    };
  }

  public fileUploadStudy(): void {
    const dialogMessageRef = this.dialog.open(FileUploadDialogComponent, {
      width: '750px'
    });
  }

  public openJustificationDialog(id: number, comments: string): void {
    const dialogRef = this.dialog.open(PromptDialogComponent, {
      width: '350px',
      data: {
        title: 'Advertencia',
        message: '¿ Está seguro que desea Justificar la Liquidación ?',
        inputPlaceholder: 'Motivo de Justificación',
        comments: comments
      }
    });

    dialogRef.afterClosed().subscribe(dialogResponse => {
      if (dialogResponse) {
        const dialogNovelty: IDialogNovely = {
          id: id,
          comments: String(dialogResponse)
        };

        this.salaryToPayService.justified(dialogNovelty).subscribe(
          () => {
            this.snackBar.open('Liquidación Justificada Correctamente', 'Aceptar', {
              duration: 5000
            });
            this.btnSearch(true);
          },
          () => {
            this.snackBar.open('Error al Justificar la Liquidación', 'Aceptar', {
              duration: 5000
            });
          }
        );
      }
    });
  }

  public payed(id: number): void {
    if (id) {
      const dialogCruising: IDialogNovely = {
        id: id
      };
      this.salaryToPayService.payed(dialogCruising).subscribe(
        resu => {
          this.snackBar.open('Registro Liquidado Correctamente', 'Aceptar', {
            duration: 5000
          });
          this.btnSearch(true);
        },
        error => {
          this.snackBar.open('Error al Liquidar el registro', 'Aceptar', {
            duration: 5000
          });
        }
      );
    } else {
      this.snackBar.open('Error al Liquidar el registro', 'Aceptar', {
        duration: 5000
      });
    }
  }

  public reconcile(id: number): void {
    if (id) {
      const dialogCruising: IDialogNovely = {
        id: id
      };
      this.salaryToPayService.reconcile(dialogCruising).subscribe(
        resu => {
          this.snackBar.open('Registro Conciliado Correctamente', 'Aceptar', {
            duration: 5000
          });
          this.btnSearch(true);
        },
        error => {
          this.snackBar.open('Error al Conciliar el registro', 'Aceptar', {
            duration: 5000
          });
        }
      );
    } else {
      this.snackBar.open('Error al Conciliar el registro', 'Aceptar', {
        duration: 5000
      });
    }
  }

  public exportToExcel(): void {
    this.spinnerButtonExcel.active = true;
    this.spinnerButtonExcel.text = 'Exportando datos...';
    this.bindFiltersData();
    const excelData: IExcelDownload = {
      controller: 'salarytopay',
      controllerAction: 'exporttoexcel',
      fileName: 'Liquidaciones - ' + moment().format('DD/MM/YYYY'),
      body: { filters: this.filtersData }
    };
    this.fileService.downloadExcel(excelData, () => {
      this.spinnerButtonExcel.active = false;
      this.spinnerButtonExcel.text = 'Exportar';
    });
  }

  public onChangeStatusToSent(): void {
    const excelData: IExcelDownload = {
       controller: 'salarytopay',
       controllerAction: 'changestatustosent',
       fileName: 'Liquidaciones Enviadas a Estudio - ' + moment().format('DD/MM/YYYY')
     };
     this.fileService.downloadExcel(excelData, () => {
       this.btnSearch(true);
     });
   }
}
