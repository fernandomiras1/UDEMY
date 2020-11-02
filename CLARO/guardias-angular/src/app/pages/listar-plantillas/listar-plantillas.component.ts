import { Component, OnInit } from '@angular/core';
import { GeneralService } from '@app/services/general.service';
import { MODE_STATUS_TEMPLATE, ROLE } from '@app/utils/common.enum';

@Component({
  selector: 'app-listar-plantillas',
  templateUrl: './listar-plantillas.component.html',
  styleUrls: ['./listar-plantillas.component.scss']
})
export class ListarPlantillasComponent implements OnInit {

  user: any = {};
  modeTemplate: typeof MODE_STATUS_TEMPLATE = MODE_STATUS_TEMPLATE;
  role: typeof ROLE = ROLE;
  constructor(
    private generalService: GeneralService,
  ) { }

  ngOnInit(): void {
    this.user = this.generalService.getUser();
  }

}
