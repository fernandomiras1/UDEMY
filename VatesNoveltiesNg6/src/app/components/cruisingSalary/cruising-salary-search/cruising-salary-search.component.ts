import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../services/entities/employee.service';
import { PmsService } from '../../../services/entities/pms.service';
import { ProjectsService } from '../../../services/entities/projects.service';
import { ClientService } from '../../../services/entities/client.service';
import { ManagersService } from '../../../services/entities/managers.service';
import {
  ApplicationService,
  MY_FORMATS
} from '../../../services/application/application.service';
import { ButtonService } from '../../../services/ui/buttons.service';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatDatepicker,
  PageEvent,
  MAT_DATE_FORMATS,
  MatDialog
} from '@angular/material';
import { ButtonOpts } from 'mat-progress-buttons';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CruisingSalaryStatusEnum } from '../../../models/enums/Enums';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { debounceTime } from 'rxjs/operators';
import {
  ICruisingSalaryManagerFilter,
  CruisingSalaryListModel,
  CruisingSalaryItems
} from '../../../models/entities/CruisingSalaryDTOs';
import { CruisingSalaryService } from '../../../services/cruising-salary/cruising-salary.service';
import {
  IExcelDownload,
  FileService
} from 'src/app/services/common/file.service';
import {
  AuthService,
  IAuthentication
} from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { PromptDialogComponent } from 'src/app/components/ui/prompt-dialog/prompt-dialog.component';
import { IDialogNovely } from 'src/app/models/ui/DialogData';
import { CruisingSalaryDialogComponent } from '../../ui/cruising-salary-dialog/cruising-salary-dialog.component';
import { MessageDialogComponent } from '../../ui/message-dialog/message-dialog.component';
const moment = _moment;

@Component({
  selector: 'app-cruising-salary-search',
  templateUrl: './cruising-salary-search.component.html',
  styleUrls: ['./cruising-salary-search.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class CruisingSalarySearchComponent implements OnInit {
  // ****************************** Constructor del Componente ******************************
  public authenticationData: IAuthentication;
  constructor(
    private route: Router,
    private cruisingSalaryService: CruisingSalaryService,
    private employeeService: EmployeeService,
    private pmsService: PmsService,
    private projectsService: ProjectsService,
    private clientService: ClientService,
    private managersService: ManagersService,
    private appService: ApplicationService,
    private buttonService: ButtonService,
    private fileService: FileService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.authenticationData = AuthService.authData;
  }
  // ****************************** Miembros del Componente ******************************
  formSearch: FormGroup;
  spinnerButtonSearch: ButtonOpts;
  spinnerButtonExcel: ButtonOpts;
  spinnerButtonInitMonth: ButtonOpts;
  dataSource = new MatTableDataSource();
  selection = new SelectionModel();
  public filtersData: ICruisingSalaryManagerFilter;
  public displayedColumns;
  resultsLength = 0;
  pageNumber = 0;
  totalNotApprovedOrSend = 0;
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
  statusEnum: typeof CruisingSalaryStatusEnum = CruisingSalaryStatusEnum;
  // ****************************** Funciones del Privadas ******************************

  ngOnInit() {
    this.createFormSearch();
    this.bindDDLs();
    this.gridOptions();
    this.hasPermission();
    this.spinnerButton();
    this.getStatusNotApprovedOrSend();
  }

  spinnerButton(): void {
    this.spinnerButtonSearch = this.buttonService.spinnerButton(
      'Buscar',
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
    this.spinnerButtonInitMonth = this.buttonService.spinnerButton(
      'Iniciar/Actualizar Mes',
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
      withNovelty: [null]
    });
  }

  btnSearch(isPager: boolean): void {
    if (!isPager) {
      this.paginator.firstPage();
      this.spinnerButtonSearch.active = true;
    }
    this.bindFiltersData();
    this.cruisingSalaryService
      .getByFilters(
        this.filtersData,
        this.paginator ? this.paginator.pageIndex + 1 : 1
      )
      .subscribe((response: CruisingSalaryListModel) => {
        if (response) {
          this.gridData(response.items);
          this.resultsLength = response.items_count;
          this.getStatusNotApprovedOrSend();
          if (!isPager) {
            this.spinnerButtonSearch.active = false;
          }
        }
      });
  }

  btnApprove(): void {
    this.bindFiltersData();
    this.filtersData.StatusId = this.statusEnum.Pending;
    this.cruisingSalaryService.GetTotalByFilters(this.filtersData).subscribe((total: number) => {
    if (total > 0) {
      const dialogMessageRef = this.dialog.open(MessageDialogComponent, {
        width: '450px',
        data: {
          message: '¿ Está seguro que desea aprobar ' + total + ' sueldos cruceros ?',
          title: 'Advertencia',
          btnButton: 'Aprobar'
        }
      });

      dialogMessageRef.afterClosed().subscribe(result => {
          if (result) {
           this.cruisingSalaryService.ApproveByFilters(this.filtersData).subscribe(
              () => {
                this.snackBar.open('Sueldos Cruceros Aprobados Correctamente', 'Aceptar', {
                  duration: 5000
                });
                this.btnSearch(true);
              },
              () => {
                this.snackBar.open('Error al Aprobar Sueldos Cruceros', 'Aceptar', {
                  duration: 5000
                });
              }
            );
          }
        });
      } else {
        this.snackBar.open('No hay Registros para Aprobar Sueldos Cruceros', 'Aceptar', {
          duration: 5000
        });
      }
    });
  }

  btnDisapprove(): void {
    this.bindFiltersData();
    this.filtersData.StatusId = this.statusEnum.Approved;
    this.cruisingSalaryService.GetTotalByFilters(this.filtersData).subscribe((total: number) => {
    if (total > 0) {
      const dialogMessageRef = this.dialog.open(MessageDialogComponent, {
        width: '450px',
        data: {
          message: '¿ Está seguro que desea desaprobar ' + total + ' sueldos cruceros ?',
          title: 'Advertencia',
          btnButton: 'Desaprobar'
        }
      });

      dialogMessageRef.afterClosed().subscribe(result => {
          if (result) {
           this.cruisingSalaryService.DisapproveByFilters(this.filtersData).subscribe(
              () => {
                this.snackBar.open('Sueldos Cruceros Desaprobados Correctamente', 'Aceptar', {
                  duration: 5000
                });
                this.btnSearch(true);
              },
              () => {
                this.snackBar.open('Error al Desaprobar Sueldos Cruceros', 'Aceptar', {
                  duration: 5000
                });
              }
            );
          }
        });
      } else {
        this.snackBar.open('No hay Registros para Desaprobar Sueldos Cruceros', 'Aceptar', {
          duration: 5000
        });
      }
    });
  }


  getInitializeMonth() {
    this.spinnerButtonInitMonth.active = true;
    this.spinnerButtonInitMonth.text = 'Espere por favor...';
    this.cruisingSalaryService.getInitialize().subscribe(
      resu => {
        this.spinnerButtonInitMonth.active = false;
        this.spinnerButtonInitMonth.text = 'Iniciar/Actualizar Mes';
        this.snackBar.open('Inicio de Mes Generado Correctamente', 'Aceptar', {
          duration: 3000
        });
      },
      error => {
        this.spinnerButtonInitMonth.active = false;
        this.spinnerButtonInitMonth.text = 'Iniciar/Actualizar Mes';
        this.snackBar.open('Error al Generar el Inicio de Mes', 'Aceptar', {
          duration: 3000
        });
      }
    );
  }

  getStatusNotApprovedOrSend(): void {
    this.cruisingSalaryService.getStatusNotApprovedOrSend().subscribe(
      resu => {
        this.totalNotApprovedOrSend = resu;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectApprover() {
    if (this.selection.selected.length <= 0) {
      this.snackBar.open('Debe seleccionar al menos un registro', 'Aceptar', {
        duration: 5000
      });
    } else {
      this.cruisingSalaryService
        .bulkApproval(
          this.selection.selected.map((res: CruisingSalaryItems) => res.Id)
        )
        .subscribe(
          resu => {
            this.snackBar.open('Sueldos Cruceros Aprobados Correctamente', 'Aceptar', {
              duration: 5000
            });
            this.btnSearch(true);
          },
          error => {
            this.snackBar.open('Error al Aprobar los Sueldos Cruceros', 'Aceptar', {
              duration: 5000
            });
          }
        );
    }
  }

  public onSendToProcess(): void {
   const excelData: IExcelDownload = {
      controller: 'cruisingsalary',
      controllerAction: 'toprocess',
      fileName: 'Sueldos Cruceros Enviados - ' + moment().format('DD/MM/YYYY')
    };
    this.fileService.downloadExcel(excelData, () => {
      this.btnSearch(true);
    });
  }

  exportExcel() {
    this.spinnerButtonExcel.active = true;
    this.spinnerButtonExcel.text = 'Exportando datos...';
    this.bindFiltersData();
    const excelData: IExcelDownload = {
      controller: 'cruisingsalary',
      controllerAction: 'toexcel',
      fileName: 'Sueldos Cruceros - ' + moment().format('DD/MM/YYYY'),
      body: { filters: this.filtersData }
    };
    this.fileService.downloadExcel(excelData, () => {
      this.spinnerButtonExcel.active = false;
      this.spinnerButtonExcel.text = 'Exportar';
    });
  }

  getName(item: any) {
    return item.FirstName + ' ' + item.LastName;
  }

  // Grilla - Gestor Sueldo Crucero
  gridOptions() {
    this.displayedColumns = [
      'select',
      'Month',
      'Cuit',
      'EmployeeName',
      'Location',
      'BasicSalary',
      'OnAccountSalary',
      'NetSalary',
      'AdditionalSalary',
      'TotalSalary',
      'CATDate',
      'AgreementCoefficient',
      'GrossSalary',
      'NoveltyAmount',
      'StatusDescription',
      'NoveltyTypes',
      'Observations',
      'AdditionalInformation',
      'actions'
    ];
    // this.dataSource.paginator = this.paginator;
  }

  gridData(data) {
    this.selection = new SelectionModel(true, []);
    this.dataSource = new MatTableDataSource(data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.filter(
      (row: CruisingSalaryItems) => row.StatusId === this.statusEnum.Pending
    ).length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: CruisingSalaryItems) => {
          if (row.StatusId === this.statusEnum.Pending) {
            this.selection.select(row);
          }
        });
  }

  dataSourceApproved() {
    return this.dataSource.data.forEach((row: CruisingSalaryItems) => {
      if (row.StatusId === this.statusEnum.Approved) {
        this.selection.select(row);
      }
    });
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
    this.appService.getCruisingSalaryStatus().subscribe(response => {
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

  getNext(event: PageEvent) {
    this.btnSearch(true);
  }

  public approveCruisingSalary(id: number): void {
    if (id) {
      const dialogCruising: IDialogNovely = {
        id: id
      };
      this.cruisingSalaryService.approve(dialogCruising).subscribe(
        resu => {
          this.snackBar.open('Sueldo Crucero Aprobado Correctamente', 'Aceptar', {
            duration: 5000
          });
          this.btnSearch(true);
        },
        error => {
          this.snackBar.open('Error al Aprobar el Sueldo Crucero', 'Aceptar', {
            duration: 5000
          });
        }
      );
    }
  }

  public openObserveDialog(id: number, comments: string): void {
    const dialogRef = this.dialog.open(PromptDialogComponent, {
      width: '350px',
      data: {
        title: 'Advertencia',
        message: '¿ Está seguro que desea Observar el Sueldo Crucero ?',
        inputPlaceholder: 'Motivo de Observación',
        comments: comments
      }
    });

    dialogRef.afterClosed().subscribe(dialogResponse => {
      if (dialogResponse) {
        const dialogNovelty: IDialogNovely = {
          id: id,
          comments: String(dialogResponse)
        };

        this.cruisingSalaryService.observe(dialogNovelty).subscribe(
          () => {
            this.snackBar.open('Sueldo Crucero Observado Correctamente', 'Aceptar', {
              duration: 5000
            });
            this.btnSearch(true);
          },
          () => {
            this.snackBar.open('Error al Observar el Sueldo Crucero', 'Aceptar', {
              duration: 5000
            });
          }
        );
      }
    });
  }

  public openSalaryDialog(rowEntity: CruisingSalaryListModel): void {
    const dialogRef = this.dialog.open(CruisingSalaryDialogComponent, {
      width: '900px',
      data: rowEntity
    });

    dialogRef.afterClosed().subscribe((dialogResponse: boolean) => {
      if (dialogResponse) {
        this.btnSearch(true);
      }
    });
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
      WithNovelty: this.formSearch.get('withNovelty').value
    };
  }
}
