import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CrudBaseComponent } from 'src/app/components/crudBase.component';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TypeEnum } from 'src/app/models/enums/Enums';
import { ApplicationService } from 'src/app/services/application/application.service';
import { ModeEnum } from 'src/environments/environment';
import { IExtraHourBindingModel } from 'src/app/models/entities/NoveltyDTO';
import { EmployeeCruise, EmployeeDetail } from 'src/app/models/entities/DtoEmployee';
import { debounceTime } from 'rxjs/operators';
import { ClientService } from 'src/app/services/entities/client.service';
import { ValidationsHelperService } from 'src/app/services/common/validationsHelper.service';
import { ProjectsService } from 'src/app/services/entities/projects.service';
import { DtoProjects } from 'src/app/models/entities/DtoProjects';
import { isNullOrUndefined } from 'util';
import { DtoClient } from 'src/app/models/entities/DtoClient';

@Component({
  selector: 'app-extra-hour',
  templateUrl: './extra-hour.component.html',
  styleUrls: ['./extra-hour.component.css']
})
export class ExtraHourComponent extends CrudBaseComponent  implements OnInit {
   // Enum
 typeEnum: typeof TypeEnum = TypeEnum;
 @Output() btnCancel = new EventEmitter();
 @Output() changeitemData = new EventEmitter();

 @Input() editItemData: any;
 @Input() employeeCruise: EmployeeCruise;
 @Input() employeeDetail: EmployeeDetail;
 public modeEnum = ModeEnum;
 public noveltyTypeListModel: IExtraHourBindingModel;

 // Combos - Autocomeple
 listClients: DtoClient[];
 listProjects: DtoProjects[];

  constructor( private formBuilder: FormBuilder,
    public appService: ApplicationService,
    private clientService: ClientService,
    private projectsService: ProjectsService,
    public validationsService: ValidationsHelperService,
    private snackBar: MatSnackBar) { super(); }

  ngOnInit() {
    this.initializeForm();
    this.bindDDLs();
    this.onChanges();
    this.setMode(this.appService.currentStatus);
  }

  onModeChange(): void {
    if (this.isNew) {
        // Trae el Proyecto por el Id del Empleado
        this.projectsService.getProjects(null, null, this.employeeDetail.EmpId).subscribe((response: DtoProjects[]) => {
          // Cargo los datos del cliente en el autocomplete.
          if (response[0]) {
          this.componentForm.get('Project').setValue(response[0]);
          this.onSelectedOption(true, response[0]);
        }
      });
    }

    if (this.isEdit || this.isView) {
      this.modeEdit();
    }
  }

  modeEdit() {
    this.componentForm.patchValue(this.editItemData);
    this.clientService.getClientbyId(this.editItemData.Client.Id).subscribe((response: DtoClient) => {
      this.componentForm.get('Client').setValue(response);
   });

     // Trae el Proyecto por el Id
     this.projectsService.getProjectbyId(this.editItemData.Project.Id).subscribe((response: DtoProjects) => {
     if (response) {
       this.componentForm.get('Project').setValue(response);
    }
  });
  }


  private initializeForm(): void {

    const defaultValue: any = {
      value: null,
      disabled: this.appService.currentStatus === ModeEnum.View
    };
    this.componentForm = this.formBuilder.group({
      NoveltyDescription: ['Horas Extras'],
      NoveltyType: [this.typeEnum.HorasExtras],
      TotalAmount: [{value: 0, disabled: true }],
      Percentage: [{value: '1.5', disabled: this.appService.currentStatus === ModeEnum.View }],
      Client: [defaultValue, [Validators.required]],
      Project: [defaultValue, [Validators.required]],
      NumberHours: [{value: 0, disabled: this.appService.currentStatus === ModeEnum.View }, [Validators.required, Validators.min(1)]],
      BaseNumberHours: [{value: 0, disabled: this.appService.currentStatus === ModeEnum.View }, [Validators.required, Validators.min(1)]],
      CurrentMonth: [true]
    });
  }

public bindDDLs(): void {
 // Clientes - Autocomeplete
 this.componentForm
 .get('Client')
 .valueChanges.pipe(debounceTime(500))
 .subscribe(data => {
   if (data.length >= this.appService.maxLengthAutoComplete) {
       this.clientService.getClient(data).subscribe((response: DtoClient[]) => {
       this.listClients = response;
     });
   }
 });

 // Proyectos - Autocomeplete
 this.componentForm
 .get('Project')
 .valueChanges.pipe(debounceTime(500))
 .subscribe(data => {
   if (data.length >= this.appService.maxLengthAutoComplete) {
    if (isNullOrUndefined(this.componentForm.get('Client').value)) {
      this.projectsService.getProjects(data).subscribe((response: DtoProjects[]) => {
        this.listProjects = response;
      });
    } else {
      this.projectsService.getProjects(data, this.componentForm.get('Client').value.Id).subscribe((response: DtoProjects[]) => {
        this.listProjects = response;
      });
    }
   }
 });

 }

  public addGuards(): void {
   if (this.componentForm.valid) {
      this.bindData();
      this.changeitemData.emit(this.noveltyTypeListModel);
      this.btnCancel.emit(false);
  } else {
      this.validateAllFormFields(this.componentForm);
  }
  }

  private bindData(): void {
    this.noveltyTypeListModel = this.componentForm.getRawValue();
    this.noveltyTypeListModel.NewAdditionalSalary = this.employeeCruise.Additional;
    this.noveltyTypeListModel.NewNetSalary = this.employeeCruise.Net;
    this.noveltyTypeListModel.NewTotal = this.componentForm.get('TotalAmount').value + this.employeeCruise.Total;
    this.noveltyTypeListModel.NewDifference = this.componentForm.get('TotalAmount').value;
    this.noveltyTypeListModel.IncrementPercentage = this.componentForm.get('Percentage').value;
  }

  public mapPricingTotalAmount(): void {
    const netTotal = this.employeeCruise.Total;
    const allValues: IExtraHourBindingModel = this.componentForm.getRawValue();
    const newTotalAmount = (allValues.NumberHours * Number(allValues.Percentage) * (allValues.BaseNumberHours ? netTotal / allValues.BaseNumberHours : 0));
    if (newTotalAmount) {
     this.componentForm.get('TotalAmount').setValue(Number(newTotalAmount.toFixed(2)));
    }
  }

  public comeback() {
    this.btnCancel.emit(false);
  }

  public onSelectedOption(isSelected: boolean, item: DtoProjects): void {
    const idClient = this.componentForm.value.Client ? this.componentForm.value.Client.Id : 0;
    if (isSelected) {
      if (item.ClientId) {
        if (item.ClientId !== idClient) {
           this.clientService.getClientbyId(item.ClientId).subscribe((response: DtoClient) => {
           this.componentForm.get('Client').setValue(response);
        });
       }
     }
    }
  }


  private onChanges(): void {
    this.componentForm.get('Client').valueChanges.subscribe((value: any) => {
      if (!value.Id) {
        this.componentForm.get('Project').setValue('');
      }
    });

  }

   // ****************************** Funciones del Display Autocomplete ******************************

  public displayProject(item): string {
    return item ? item.Name : item;
  }

  public displayClient(item): string {
    return item ? item.Name : item;
  }


}
