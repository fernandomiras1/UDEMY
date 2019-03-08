import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  PageEvent,
  MatDialog,
  MatSnackBar,
  MAT_DATE_FORMATS
} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { PmsService } from '../../../services/entities/pms.service';
import { ProjectsService } from '../../../services/entities/projects.service';
import { debounceTime } from 'rxjs/operators';
import { EmployeeService } from '../../../services/entities/employee.service';
import { ClientService } from '../../../services/entities/client.service';
import { ManagersService } from '../../../services/entities/managers.service';
import * as _moment from 'moment';
import { NoveltyUIService } from '../../../services/novelties/novelties.service';
import {
  ApplicationService,
  MY_FORMATS
} from '../../../services/application/application.service';
import { ModeEnum } from '../../../../environments/environment';
import { ButtonService } from 'src/app/services/ui/buttons.service';
import { NoveltyStatusEnum, TypeEnum } from '../../../models/enums/Enums';
import { ButtonOpts } from 'mat-progress-buttons';
import { IDialogNovely } from '../../../models/ui/DialogData';
import { MessageDialogComponent } from '../../ui/message-dialog/message-dialog.component';
import {
  FileService,
  IExcelDownload
} from '../../../services/common/file.service';
import {
  AuthService,
  IAuthentication
} from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { INoveltyManagerFilter } from 'src/app/models/entities/Abstracts/INoveltyDTO';
import { CrudBaseComponent } from 'src/app/components/crudBase.component';
import { NoveltyListModel } from 'src/app/models/entities/NoveltyDTO';
import { ValidationsHelperService } from 'src/app/services/common/validationsHelper.service';

const moment = _moment;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class SearchComponent extends CrudBaseComponent<null> implements OnInit {
  // ****************************** Constructor del Componente ******************************
  public authenticationData: IAuthentication;

  constructor(
    private route: Router,
    private employeeService: EmployeeService,
    private pmsService: PmsService,
    private projectsService: ProjectsService,
    private clientService: ClientService,
    private managersService: ManagersService,
    private appService: ApplicationService,
    public noveltiesService: NoveltyUIService,
    private buttonService: ButtonService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fileService: FileService,
    private fb: FormBuilder,
    public validationsService: ValidationsHelperService
  ) {
    super();
    this.authenticationData = AuthService.authData;
  }

  // ****************************** Miembros del Componente ******************************
  formSearch: FormGroup;
  spinnerButtonSearch: ButtonOpts;
  spinnerButtonExcel: ButtonOpts;
  dataSource = new MatTableDataSource();
  displayedColumns;
  resultsLength = 0;
  pageNumber = 0;
  isLoadingAutoResource = false;
  isLoadingAutoProject = false;
  isLoadingAutoClient = false;
  isLoadingResults = false;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  // Combos - Autocomeple
  filtersData: INoveltyManagerFilter;
  listPms: any;
  listProjects: any;
  listResource: any;
  listClients: any;
  listReviser: any;
  listStatus: any;
  listTypes: any;
  // Enum
  statusEnum: typeof NoveltyStatusEnum = NoveltyStatusEnum;
  typeEnum: typeof TypeEnum = TypeEnum;
  dialogNovely: IDialogNovely;
  // ****************************** Funciones del Componente ******************************

  ngOnInit(): void {
    this.spinnerButton();
    this.createFormSearch();
    this.gridOptions();
    this.bindDDLs();
    this.hasPermission();
    this.onChanges();
    this.setMode(ModeEnum.Search);
    this.noveltiesService.initialize(this);
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
      incrementPercentageFrom: [null, Validators.pattern(this.validationsService.regularExpressions.onlyIntegerNumbers)],
      incrementPercentageTo: [null, Validators.pattern(this.validationsService.regularExpressions.onlyIntegerNumbers)],
      withRetroactive: [false]
    });
  }

  private onChanges(): void {
    this.formSearch.get('withRetroactive').valueChanges.subscribe((value: boolean) => {
      if (value) {
      this.formSearch.get('typeId').setValue(this.typeEnum.Recategorizacion);
      this.formSearch.get('typeId').disable();
     } else {
      this.formSearch.get('typeId').enable();
     }
    });
  }

  hasPermission(): void {
    if (!this.authenticationData.permissions.NovedadesConsulta) {
      this.route.navigate(['/home']);
    }
  }

  newNovelties() {
    this.appService.currentStatus = ModeEnum.New;
  }

  editNovelty(id: number) {
    this.appService.currentStatus = ModeEnum.Edit;
    this.appService.changeViewStatus(
      ModeEnum.Edit,
      this.noveltiesService.get(id)
    );
  }

  viewNovelty(id: number) {
    this.appService.currentStatus = ModeEnum.View;
    this.appService.changeViewStatus(
      ModeEnum.View,
      this.noveltiesService.get(id)
    );
  }

  getName(item: any) {
    return item.FirstName + ' ' + item.LastName;
  }

  validateLessThan(): boolean {
    const min = this.formSearch.get('incrementPercentageFrom').value;
    const max = this.formSearch.get('incrementPercentageTo').value;
    if (min && max) {
      if ( min > max) {
        this.snackBar.open('El % Recat Min no puede ser mayor al % Recat Máx', 'Aceptar', {
          duration: 5000
        });
        return true;
      }
    }
  }

  btnSearch(isPager: boolean) {
    if (this.formSearch.valid && !this.validateLessThan()) {
      if (!isPager) {
        this.paginator.firstPage();
        this.spinnerButtonSearch.active = true;
        this.spinnerButtonSearch.text = 'Buscando datos...';
      }
      this.bindFiltersData();
      this.isLoadingResults = true;
      this.noveltiesService
        .getByFilters(
          this.filtersData,
          this.paginator ? this.paginator.pageIndex + 1 : 1
        )
        .subscribe((response: NoveltyListModel) => {
          if (response) {
            this.gridData(response.items);
            this.resultsLength = response.items_count;
            this.isLoadingResults = false;
            if (!isPager) {
              this.spinnerButtonSearch.active = false;
              this.spinnerButtonSearch.text = 'Buscar';
            }
          }
        });
    } else {
      this.validateAllFormFields(this.formSearch);
    }
  }
  // Grilla - Gestor Novedades
  gridOptions() {
    this.displayedColumns = [
      'Month',
      'EmployeeName',
      'CurrentNetSalary',
      'NewNetSalary',
      'NoveltyPercentage',
      'NoveltyAmount',
      'NoveltyType',
      'NoveltyStatusName',
      'Approver',
      'Observations',
      'actions'
    ];
    // this.dataSource.paginator = this.paginator;
  }

  gridData(data) {
    this.dataSource = new MatTableDataSource(data);
    // this.dataSource.paginator = this.paginator;
  }
  // Mapper filterData
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
      IncrementPercentageFrom: this.formSearch.get('incrementPercentageFrom').value
      ? this.formSearch.get('incrementPercentageFrom').value
      : 0,
      IncrementPercentageTo: this.formSearch.get('incrementPercentageTo').value
      ? this.formSearch.get('incrementPercentageTo').value
      : 0,
      WithRetroactive: this.formSearch.get('withRetroactive').value
    };
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
    // GetReviser (Verifico si el usuario logeado es Revisor y lo peseteo en el combo de Revisor)
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
    this.appService.getNoveltyStatus().subscribe(response => {
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
    // this.pageNumber = event.pageIndex;
    this.btnSearch(true);
  }

  exportExcel() {
    this.spinnerButtonExcel.active = true;
    this.spinnerButtonExcel.text = 'Exportando datos...';
    this.bindFiltersData();
    const excelData: IExcelDownload = {
      controller: 'novelties',
      controllerAction: 'toexcel',
      fileName: 'Novedades - ' + moment().format('DD/MM/YYYY'),
      body: { filters: this.filtersData }
    };
    this.fileService.downloadExcel(excelData, () => {
      this.spinnerButtonExcel.active = false;
      this.spinnerButtonExcel.text = 'Exportar';
    });
  }

  public search(): void {
    this.btnSearch(true);
  }
}
