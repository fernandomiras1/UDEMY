import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { EmployeeCruise } from '../../../../models/entities/DtoEmployee';
import { INoveltyTypeListModel } from '../../../../models/entities/Abstracts/INoveltyDTO';
import { TypeEnum, CommonMessageEnum } from '../../../../models/enums/Enums';
import { ModeEnum } from '../../../../../environments/environment';
import { ApplicationService } from '../../../../services/application/application.service';
import { MatSnackBar } from '@angular/material';
import { CrudBaseComponent } from '../../../crudBase.component';
import { ValidationsHelperService } from 'src/app/services/common/validationsHelper.service';
const moment = _moment;

@Component({
  selector: 'app-recategorization',
  templateUrl: './recategorization.component.html',
  styleUrls: ['./recategorization.component.css']
})
export class RecategorizationComponent
  extends CrudBaseComponent<INoveltyTypeListModel>
  implements OnInit, OnChanges {
  lastDateOf = moment(new Date())
    .subtract(1, 'months')
    .endOf('month');
  private formSubmitAttempt: boolean;
  recategorization: FormGroup;
  @Input()
  employeeCruise: EmployeeCruise;
  // va hacer el boton cancelar. Pasar por vandera un estado false.
  @Output()
  btnCancel = new EventEmitter();
  @Output()
  changeitemData = new EventEmitter();
  // Enum
  typeEnum: typeof TypeEnum = TypeEnum;
  public modeEnum = ModeEnum;
  constructor(
    private fb: FormBuilder,
    public appService: ApplicationService,
    public snackBar: MatSnackBar,
    public validationsService: ValidationsHelperService
  ) {
    super();
  }

  ngOnInit() {
    this.createRecategorizationFrom();
    this.bindFormData();
  }

  bindFormData() {
    if (
      this.appService.currentStatus === ModeEnum.Edit ||
      this.appService.currentStatus === ModeEnum.View
    ) {
      this.recategorization.patchValue(this.employeeCruise);
      this.mapPricingData(true);
      // this.changePeriod();
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.recategorization.get(field).valid &&
        this.recategorization.get(field).touched) ||
      (this.recategorization.get(field).untouched && this.formSubmitAttempt)
    );
  }

  // Con este metodo manejo el tema de lo asicronico en los Input.
  // Cuando cambia la propiedad ( pasa de estar undefinder a Cargar el Objeto)
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['employeeCruise'].isFirstChange()) {
      this.recategorization.patchValue(this.employeeCruise);
      this.recategorization
        .get('NewNetSalary')
        .setValue(this.employeeCruise.Net);
      this.recategorization
        .get('NewAdditionalSalary')
        .setValue(this.employeeCruise.Additional);
      this.mapPricingData(false);
      // this.changePeriod();
    }
  }

  createRecategorizationFrom() {
    const defaultValue: any = {
      value: null,
      disabled: this.appService.currentStatus === ModeEnum.View
    };

    this.recategorization = this.fb.group({
      NoveltyDescription: ['Recategorización'],
      NoveltyType: [this.typeEnum.Recategorizacion],
      Net: [{ value: null, disabled: true }],
      Additional: [{ value: null, disabled: true }],
      Total: [{ value: null, disabled: true }],
      NewNetSalary: [defaultValue, [Validators.required, Validators.min(0), Validators.pattern(this.validationsService.regularExpressions.onlyIntegerNumbers)]],
      NewAdditionalSalary: [defaultValue, [Validators.min(0), Validators.pattern(this.validationsService.regularExpressions.onlyIntegerNumbers)]],
      NewTotal: [{ value: null, disabled: true }],
      IncrementPercentage: [defaultValue, [Validators.min(0)]],
      NewDifference: [{ value: null, disabled: true }],
      IsRetroactive: [
        {
          value: false,
          disabled: this.appService.currentStatus === ModeEnum.View
        }
      ],
      RetroactiveAmount: [defaultValue],
      RetroactiveMonthCount: [{ value: 0, disabled: true }],
      RetroactiveDate: [
        {
          value: this.lastDateOf,
          disabled: this.appService.currentStatus === ModeEnum.View
        }
      ]
    });
  }
  comeback() {
    this.btnCancel.emit(false);
  }

  mapPricingData(modeEdit) {
    this.recategorization
      .get('NewTotal')
      .setValue(Math.ceil(
        this.recategorization.get('NewNetSalary').value +
          this.recategorization.get('NewAdditionalSalary').value
      ));
    this.recategorization
      .get('IncrementPercentage')
      .setValue(
        (
          (this.recategorization.get('NewTotal').value /
            this.recategorization.get('Total').value) *
            100 -
          100
        ).toFixed(2)
      );
    this.recategorization
      .get('NewDifference')
      .setValue(
        (
          this.recategorization.get('NewTotal').value -
          this.recategorization.get('Total').value
        ).toFixed(2)
      );
    if (modeEdit) {
      this.recategorization
        .get('RetroactiveAmount')
        .setValue(this.employeeCruise.RetroactiveAmount);
    } else {
      this.recategorization
        .get('RetroactiveAmount')
        .setValue(this.recategorization.get('NewDifference').value);
    }
  }
  mapPricingAmountIncrement() {
    this.recategorization
      .get('NewNetSalary')
      .setValue(Math.ceil(
        this.recategorization.get('Total').value +
          (this.recategorization.get('Total').value *
            this.recategorization.get('IncrementPercentage').value) /
            100 -
          this.recategorization.get('NewAdditionalSalary').value
      ));
    this.recategorization
      .get('NewTotal')
      .setValue(
        this.recategorization.get('NewNetSalary').value +
          this.recategorization.get('NewAdditionalSalary').value
      );
    this.recategorization
      .get('NewDifference')
      .setValue(
        (
          this.recategorization.get('NewTotal').value -
          this.recategorization.get('Total').value
        ).toFixed(2)
      );
    this.recategorization
      .get('RetroactiveAmount')
      .setValue(this.recategorization.get('NewDifference').value);
  }
  changePeriod(event: MatDatepickerInputEvent<Date>) {
    if (this.lastDateOf.toDate() < event.value) {
      this.recategorization.get('RetroactiveDate').setValue(this.lastDateOf);
      this.recategorization.get('RetroactiveMonthCount').setValue('');
      this.snackBar.open(
        'El mes seleccionado no puede ser mayor al mes actual',
        'Aceptar',
        {
          duration: 5000
        }
      );
      return;
    }
    const getPeriod: any = moment(event.value);
    const countMonth: any = Math.abs(
      this.lastDateOf.diff(getPeriod, 'months', true)
    ).toFixed(1);
    this.recategorization.get('RetroactiveMonthCount').setValue(countMonth);
  }

  addNovelty() {
    this.formSubmitAttempt = true;
    this.recategorization
      .get('RetroactiveAmount')
      .setValue(
        this.recategorization.get('IsRetroactive').value
          ? this.recategorization.get('RetroactiveAmount').value
          : 0
      );
    this.recategorization
      .get('RetroactiveDate')
      .setValue(
        this.recategorization.get('IsRetroactive').value
          ? this.recategorization.get('RetroactiveDate').value
          : ''
      );
    if (this.recategorization.valid) {
      this.changeitemData.emit(this.recategorization.getRawValue());
      this.btnCancel.emit(false);
    } else {
      this.validateAllFormFields(this.recategorization);
    }
  }
}
