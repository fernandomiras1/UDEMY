import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { ISalaryDistributionBindingModel } from 'src/app/models/entities/CruisingSalaryDTOs';
import { CrudBaseComponent } from '../../crudBase.component';
import { CruisingSalaryService } from 'src/app/services/cruising-salary/cruising-salary.service';

@Component({
  selector: 'app-cruising-salary-dialog',
  templateUrl: './cruising-salary-dialog.component.html',
  styleUrls: ['./cruising-salary-dialog.component.css']
})
export class CruisingSalaryDialogComponent extends CrudBaseComponent<ISalaryDistributionBindingModel> implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CruisingSalaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISalaryDistributionBindingModel,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private cruisingService: CruisingSalaryService
  ) {
    super();
    this.initializeForm(data);
  }

  public ngOnInit(): void {
    this.onChanges();
  }

  public onSubmit(): void {
    if (this.validForm()) {
      this.cruisingService.update(this.componentForm.getRawValue()).subscribe(() => {
        this.snackBar.open('Sueldo Modificado Correctamente', 'Aceptar', {
          duration: 2000
        });
        this.dialogRef.close(true);
      }, () => {
        this.snackBar.open('Error al Modificar el Sueldo', 'Aceptar', {
          duration: 3000
        });
      });
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  private initializeForm(data: ISalaryDistributionBindingModel): void {
    this.componentForm = this.formBuilder.group({
      Id: new FormControl(0),
      EmployeeName: new FormControl({ value: '', disabled: true }),
      BasicSalary: new FormControl({ value: 0, disabled: true }),
      OnAccountSalary: new FormControl({ value: 0, disabled: true }),
      NetSalary: new FormControl({ value: 0, disabled: true }),
      DistributionPercentaje: new FormControl({ value: 0, disabled: true }),
      newBasicSalary: new FormControl(0, [
        Validators.required,
        this.greaterOrEqualThanBasicSalary
      ]),
      newOnAccountSalary: new FormControl({ value: 0, disabled: true }),
      newDistributionPercentaje: new FormControl({ value: 0, disabled: true })
    });

    this.componentForm.patchValue(data);
  }

  private greaterOrEqualThanBasicSalary(input: FormControl): any {
    if (!input.root || !input.root.get('BasicSalary')) {
      return null;
    }

    const result = (
      (Number(input.value) > input.root.get('BasicSalary').value) &&
      (Number(input.value) <= input.root.get('NetSalary').value)
    );

    return result ? null : { greaterOrEqual: true };
  }

  private onChanges(): void {
    this.componentForm.get('newBasicSalary').valueChanges.subscribe((value: number) => {
      const allValues: ISalaryDistributionBindingModel = this.componentForm.getRawValue();
      const newOnAccountSalary = (allValues.OnAccountSalary + (allValues.BasicSalary - Number(value)));
      const newDistributionPercentaje = allValues.NetSalary !== 0 ? ((newOnAccountSalary / allValues.NetSalary) * 100) : 0;

      this.componentForm.patchValue({
        newOnAccountSalary: Number(newOnAccountSalary.toFixed(2)),
        newDistributionPercentaje: Number(newDistributionPercentaje.toFixed(2))
      });
    });
  }
}
