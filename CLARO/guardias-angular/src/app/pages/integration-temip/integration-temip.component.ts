import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageTemip } from '@app/models/temip.model';
import { TemipService } from '@app/services/integration/temip.service';
import { GroupType } from '@app/utils/common.enum';

@Component({
  selector: 'app-integration-temip',
  templateUrl: './integration-temip.component.html',
  styleUrls: ['./integration-temip.component.scss']
})
export class IntegrationTemipComponent implements OnInit {

  optionsTableHeader = [
    'En guardia',
    'Fin de Guardia',
    'Contacto',
    'Legajo',
    'Jefe',
    'Grupos Remedy'
  ];

  data: MessageTemip;
  groupType: typeof GroupType = GroupType;
  typeGroup: string;
  isLoading = true;
  errorQueryParam = false;

  constructor(private temipService: TemipService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.typeGroup = params.get('type');
      const name = params.get('name');
      if (this.typeGroup && name) {
        this.getInfoByType(this.typeGroup, name);
      } else {
        this.isLoading = false;
        this.errorQueryParam = true;
      }
    });
  }

  getInfoByType(type: string, name: string): void {
    this.temipService.getInfoByType(type, name)
      .subscribe(resu => {
        this.isLoading = false;
        if (resu.success) {
          this.data = resu.message;
          this.data.groupList[0].isOpen = true;
        }
      }, 
      error => this.isLoading = false);
  }

  get isSite(): boolean {
    return this.typeGroup === this.groupType.SITIO ? true : false;
  }


}
