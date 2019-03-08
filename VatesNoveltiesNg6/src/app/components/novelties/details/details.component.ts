import { Component, OnInit, ViewChild, DoCheck, IterableDiffers } from '@angular/core';
import { ModeEnum } from '../../../../environments/environment';
import { ApplicationService, MY_FORMATS } from '../../../services/application/application.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { EmployeeService } from '../../../services/entities/employee.service';
import { debounceTime } from 'rxjs/operators';
import { ManagersService } from '../../../services/entities/managers.service';
import {
  EmployeeDetail,
  EmployeeCruise
} from '../../../models/entities/DtoEmployee';
import { TypeEnum, NoveltyStatusEnum } from '../../../models/enums/Enums';
import { NoveltyUIService } from '../../../services/novelties/novelties.service';
import { MatSnackBar, MatTableDataSource, MatDatepicker, MAT_DATE_FORMATS } from '@angular/material';
import {
  INoveltyBindingModel,
  INoveltyRecategorizationEdit,
  IAtributeRecategorization
} from '../../../models/entities/Abstracts/INoveltyDTO';
import {
  NoveltyBindingModel,
  NoveltyTypeListModel
} from '../../../models/entities/NoveltyDTO';
import { RecategorizationComponent } from '../partial/recategorization/recategorization.component';
import { CrudBaseComponent } from '../../crudBase.component';
import { GuardsComponent } from '../partial/guards/guards.component';

const moment = _moment;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class DetailsComponent
  extends CrudBaseComponent<INoveltyRecategorizationEdit>
  implements OnInit, DoCheck {
  // ****************************** Constructor del Componente ******************************
  private formSubmitAttempt: boolean;
  iterableDiffer: any;
  constructor(
    public appService: ApplicationService,
    private employeeService: EmployeeService,
    private managersService: ManagersService,
    public noveltiesService: NoveltyUIService,
    public snackBar: MatSnackBar,
    private _iterableDiffers: IterableDiffers,
    private fb: FormBuilder
  ) {
    super();
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  // ****************************** Miembros del Componente ******************************

  /*private isView = false;
  private isEdit = false;
  private isNew = true;*/

  @ViewChild(RecategorizationComponent)
  recategorizationComponents: RecategorizationComponent;

  @ViewChild(GuardsComponent)
  guardsComponent: GuardsComponent;

  minPeriodDate = _moment(new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1));

  getComponent: any;
  itemData: INoveltyRecategorizationEdit;
  noveltyEdit: IAtributeRecategorization;
  formCreate: FormGroup;
  // Combos - Autocomeple
  listTypes: any;
  listResource: any;
  noveltyBinding: INoveltyBindingModel = new NoveltyBindingModel();
  listApprover: any;
  isLoadingResults: boolean;
  isLoadingAllScreen: boolean;
  employeeDetail: EmployeeDetail = new EmployeeDetail();
  employeeCruise: EmployeeCruise;
  // Enum
  typeEnum: typeof TypeEnum = TypeEnum;
  statusEnum: typeof NoveltyStatusEnum = NoveltyStatusEnum;
  public modeEnum = ModeEnum;
  // statusEnum: typeof NoveltyStatusEnum = NoveltyStatusEnum;
  // Grilla
  dataSource = new MatTableDataSource();
  public displayedColumns;
  // Modo Edicion
  public employeeEdit: string;
  // Modo Visualización (Motivo de Rechazo)
  public rejectComments: string;
  // ****************************** Funciones del Componente **************************

  // ****************************** Funciones del Privadas ******************************
  ngOnInit() {
    this.gridOptions();
    this.createNoveltiesFrom();
    this.bindDDLs();
    this.setMode(this.appService.currentStatus);
    this.noveltiesService.initialize(this);
  }

  ngDoCheck() {
    // Cuando cambia la grilla.
    const changes = this.iterableDiffer.diff(this.noveltyBinding.details);
    if (changes) {
      if (this.noveltyBinding.details.length > 0) {
        this.formCreate.get('employee').disable();
      } else {
        this.formCreate.get('employee').enable();
      }
    }
  }

  onModeChange(mode: ModeEnum): void {
    if (this.isEdit || this.isView) {
      this.ModeEdit();
    }
  }

  onModeComponent(id: TypeEnum) {
    if (id === this.typeEnum.Recategorizacion) {
     this.getComponent = this.recategorizationComponents.recategorization;
    } else if (id === this.typeEnum.Guardia) {
      this.getComponent = this.guardsComponent.componentForm;
    }
    return this.getComponent;
  }

  async ModeEdit() {
    if (
      this.appService.currentStatus === ModeEnum.Edit ||
      this.appService.currentStatus === ModeEnum.View
    ) {
      this.isLoadingAllScreen = true;
      this.itemData = await this.appService.onChangeStatusCallback.toPromise().catch(error => {
        this.comeback();
        this.isLoadingAllScreen = false;
      });
      if (this.itemData) {
        this.employeeEdit = this.getName(this.itemData.Employee);
        this.rejectComments = this.itemData.RejectComments;
        if (this.itemData.Employee.Id) {
          this.employeeService
            .getResourceInfo(this.itemData.Employee.Id, this.itemData.Year, this.itemData.Month)
            .subscribe((resu: any) => {
              this.employeeDetail = resu;
              this.employeeService
                .getCruisingSalaryInfo(this.itemData.Employee.Id, this.itemData.Year, this.itemData.Month)
                .subscribe((info: any) => {
                  this.employeeCruise = {
                    Net: <number>info.Net,
                    Additional: <number>info.Additional,
                    Total: <number>info.Total,
                    NewNetSalary: <number>this.itemData.NewNetSalary,
                    NewAdditionalSalary: <number>(
                      this.itemData.NewAdditionalSalary
                    ),
                    IncrementPercentage: <number>(
                      this.itemData.IncrementPercentage
                    ),
                    IsRetroactive: <boolean>this.itemData.IsRetroactive,
                    RetroactiveAmount: <number>this.itemData.RetroactiveAmount,
                    RetroactiveMonthCount: <number>(
                      this.itemData.RetroactiveMonthCount
                    ),
                    RetroactiveDate: this.itemData.RetroactiveDate
                  };
                  this.formCreate
                    .get('noveltyType')
                    .setValue(this.itemData.NoveltyType);
                  this.formCreate
                    .get('observarAdmNovedades')
                    .setValue(this.itemData.ObservedAdmComments);
                  if (
                    !this.authenticationData.permissions.ObservarAdmNovedades
                  ) {
                    this.formCreate.get('observarAdmNovedades').disable();
                  }
                  this.isLoadingAllScreen = false;
                });
            });
        }
        this.formCreate
          .get('observations')
          .setValue(this.itemData.Observations);
        this.formCreate.get('approver').setValue(this.itemData.Approver.Id);
        this.formCreate.get('periodDate').setValue(_moment(this.itemData.PeriodDate));
      }
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.formCreate.get(field).valid &&
        this.formCreate.get(field).touched) ||
      (this.formCreate.get(field).untouched && this.formSubmitAttempt)
    );
  }

  chosenYearHandlerPeriodDate(normalizedYear: Moment) {
    const ctrlValue = this.formCreate.get('periodDate').value;

    ctrlValue.year(normalizedYear.year());
    this.formCreate.get('periodDate').setValue(ctrlValue);
  }

  chosenMonthHandlerPeriodDate(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.formCreate.get('periodDate').value;

    ctrlValue.month(normlizedMonth.month());
    this.formCreate.get('periodDate').setValue(ctrlValue);
    datepicker.close();
  }

  createNoveltiesFrom() {
    const defaultValue: any = {
      value: null,
      disabled: this.appService.currentStatus === ModeEnum.View
    };

    this.formCreate = this.fb.group({
      employee: [
        null,
        this.appService.currentStatus === ModeEnum.New
          ? Validators.required
          : Validators.nullValidator
      ],
      periodDate: [{
        value: moment(this.minPeriodDate),
        disabled: this.appService.currentStatus === ModeEnum.View
      }, Validators.required],
      approver: [defaultValue, Validators.required],
      observations: [defaultValue, Validators.required],
      noveltyType: [defaultValue],
      observarAdmNovedades: [defaultValue],
      details: [this.noveltyBinding.details]
    });
  }

  onSelectedOption(isSelected: boolean, id: number): void {
    if (isSelected) {
      this.isLoadingResults = true;
      this.employeeService.getResourceInfoById(id).subscribe(
        (resu: any) => {
          this.employeeDetail = resu;
          if (this.employeeDetail.ManagerId) {
            this.formCreate
              .get('approver')
              .setValue(this.employeeDetail.ManagerId);
          }
          this.formCreate
            .get('noveltyType')
            .setValue(this.typeEnum.Recategorizacion);
          this.valueChangeTypeNovelties();
          this.isLoadingResults = false;
        });
    }
  }

  valueChangeTypeNovelties() {
    this.isLoadingAllScreen = true;
    this.employeeService
      .getCruiseById(this.employeeDetail.EmpId)
      .subscribe((resu: any) => {
        this.employeeCruise = resu;
        this.isLoadingAllScreen = false;
      }, error => {
        this.comeback();
        this.isLoadingAllScreen = false;
      });
  }
  // Este metodo permite cambiar la bandera del Cancelar = false
  closePartials(recategorizarionMode: boolean) {
    if (!recategorizarionMode) {
      this.formCreate.get('noveltyType').setValue('');
    }
  }

  onChangesItemData(items: NoveltyTypeListModel) {
    this.noveltyBinding.details.push(items);
    this.gridData(this.noveltyBinding.details);
  }

  bindDDLs() {
    // GetApprover
    this.managersService.getManagers().subscribe(response => {
      this.listApprover = response;
    });
    // GetTypes
    this.appService.getNoveltyTypes().subscribe(response => {
      this.listTypes = response;
    });
    // Recurso - Autocomeplete
    this.formCreate
      .get('employee')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(data => {
        if (data.length >= this.appService.maxLengthAutoComplete) {
          this.isLoadingResults = true;
          this.employeeService.getEmployee(data).subscribe((resu: any) => {
            this.listResource = resu;
            this.isLoadingResults = false;
          });
        }
      });
  }

  saveNovelties() {
    this.formSubmitAttempt = true;
    if (this.formCreate.valid) {
      if (this.formCreate.controls.details.value.length <= 0) {
        this.snackBar.open('Debe ingresar al menos una Novedad', 'Aceptar', {
          duration: 4000
        });
        return true;
      }

      this.noveltiesService.create(this.getItemData()).subscribe(
        () => {
          this.snackBar.open('Novedades Generadas Correctamente', 'Aceptar', {
            duration: 2000
          });
          this.comeback();
        });
    } else {
      this.validateAllFormFields(this.formCreate);
    }
    this.formSubmitAttempt = false;
  }

  bindEditData(): void {
    this.noveltyEdit = this.onModeComponent(this.itemData.NoveltyType).getRawValue();
    this.noveltyEdit.Observations = this.formCreate.get('observations').value;
    this.noveltyEdit.ObservedAdmComments = this.formCreate.get(
      'observarAdmNovedades'
    ).value;
    this.noveltyEdit.Id = this.itemData.Id;
    this.noveltyEdit.Approver = { Id: this.formCreate.get('approver').value };
    this.noveltyEdit.periodDate = new Date(this.formCreate.get('periodDate').value);
  }

  editNovelties() {
    this.formSubmitAttempt = true;
    if (
      this.formCreate.valid && this.onModeComponent(this.itemData.NoveltyType).valid
    ) {
      this.bindEditData();
      this.noveltiesService.edit(this.noveltyEdit).subscribe(
        resu => {
          this.snackBar.open('Novedad Modificada Correctamente', 'Aceptar', {
            duration: 2000
          });
          this.comeback();
        },
        error => {
          this.snackBar.open('Error al Modificar la Novedad', 'Aceptar', {
            duration: 3000
          });
        }
      );
    } else {
      this.validateAllFormFields(this.formCreate);
      this.validateAllFormFields(this.onModeComponent(this.itemData.NoveltyType));
    }
    this.formSubmitAttempt = false;
  }

  getName(item: any) {
    return item.FirstName + ' ' + item.LastName;
  }

  cleanEmployee() {
    this.formCreate.get('employee').setValue('');
    this.formCreate.get('approver').setValue('');
    this.formCreate.get('noveltyType').setValue('');
    this.formCreate.get('observations').setValue('');
    this.employeeDetail.EmpId = null;
  }

  comeback() {
    // this.appService.changeViewStatus(ModeEnum.Search);
    // this.appService.updateStatus.emit(ModeEnum.Search);
    this.appService.currentStatus = ModeEnum.Search;
  }

  // ****************************** Funciones del Display Autocomplete ******************************
  displayResource(item): string {
    return item ? item.FirstName + ' ' + item.LastName : item;
  }

  // Componentes de la Grilla
  gridOptions() {
    this.displayedColumns = [
      'NoveltyDescription',
      'Client',
      'Project',
      'NewDifference',
      'NewNetSalary',
      'NewAdditionalSalary',
      'IncrementPercentage',
      'NewTotal',
      'IsRetroactive',
      'RetroactiveAmount',
      'RetroactiveDate',
      'RetroactiveMonthCount',
      'actions'
    ];
    // this.dataSource.paginator = this.paginator;
  }

  gridData(data) {
    this.dataSource = new MatTableDataSource(data);
    // this.dataSource.paginator = this.paginator;
  }

  deleteNoveltyType(data) {
    const index = this.noveltyBinding.details.indexOf(data, 0);
    if (index > -1) {
      this.noveltyBinding.details.splice(data, 1);
      this.gridData(this.noveltyBinding.details);
    }
  }

  private getItemData(): any {
    const itemCopy = this.fb.group(this.formCreate.getRawValue());

    itemCopy.get('periodDate').setValue(new Date(this.formCreate.get('periodDate').value));
    itemCopy.get('details').setValue(this.formCreate.get('details').value);

    return itemCopy.value;
  }
}
