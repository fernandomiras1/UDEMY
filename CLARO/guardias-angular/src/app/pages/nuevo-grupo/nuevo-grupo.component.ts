import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { StepperGroupService } from '../../services/stepper-group.service';
import { AddNewGroup } from '../../models/group.model';
import { MODE_STATUS_TEMPLATE } from '@app/utils/common.enum';
import { Template } from '@app/models/template.model';
import { PlantillasService } from '@app/services/plantillas.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { forkJoin, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.scss']
})
export class NuevoGrupoComponent implements OnInit {

  public peopleByGroup: AddNewGroup;
  groupForm: FormGroup;
	modeTemplate: typeof MODE_STATUS_TEMPLATE = MODE_STATUS_TEMPLATE;
	selectedTemplates: Template[] = [];
  showLoadingModal = false;
	@ViewChild('stepper', { static: false }) stepper: MatStepper;

  constructor(public stepperGroupService: StepperGroupService,
              private plantillasService: PlantillasService,
              private router: Router,) { }

	ngOnInit(): void {
	}

  goPageEditGroup(groupForm: FormGroup, valid: boolean) {
    if (valid) {
      this.groupForm = groupForm;
			this.stepper.next();
		}
	}

	goPagePlantillas(value: AddNewGroup) {
		if (value.valid) {
			this.peopleByGroup = value;
			this.stepper.next();
		}
	}

	confirmGroup() {
    this.showLoadingModal = true;
    this.plantillasService.saveGroup(this.groupForm.value).subscribe((resu: { success: string, message: any }) => {
      const { id_grupo, nombre_grupo, descripcion } = resu.message;
      const templatesById = this.selectedTemplates.map(temp => temp.id_tipo_guardia);
      forkJoin(
        this.plantillasService.addUsersSiteTecGroup(id_grupo, nombre_grupo, descripcion, this.peopleByGroup),
        this.plantillasService.addPlantillaGroup(templatesById, id_grupo)
      ).pipe(catchError( err => {
          this.showLoadingModal = false;
          return throwError(new Error(err));
        })
      ).subscribe(() => {
        this.showLoadingModal = false;
        this.router.navigateByUrl('home');
      });
    });
  }

}
