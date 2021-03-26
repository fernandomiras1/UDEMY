import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MODE_STATUS_TEMPLATE } from '@app/utils/common.enum';
import { Template } from '@app/models/template.model';
@Component({
  selector: 'app-card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.scss']
})
export class CardTemplateComponent implements OnInit {

  @Input() template: Template;
  @Input() templateIndex: number;
  @Input() blockIndex: number;
  @Input() mode: MODE_STATUS_TEMPLATE;
  @Input() timeTile: string;
  @Input() cssTemplates: { size: Array<number>, width: string };
  @Input() verifiedDesactivarPlantillas = {};

  @Output() clicked: EventEmitter<any> = new EventEmitter();
  @Output() clickedMenuOpened: EventEmitter<number> = new EventEmitter();
  @Output() clickedDisabledTemplate: EventEmitter<any> = new EventEmitter();

  modeTemplate: typeof MODE_STATUS_TEMPLATE = MODE_STATUS_TEMPLATE;
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    const event: {template: Template, blockIndex: number} = {
      template: this.template,
      blockIndex: this.blockIndex
    };

    this.clicked.emit(event);
  }

  onMenuOpened(templateIndex: number, idTemplate: number) {
    document.querySelector('#plantilla-' + templateIndex + '-' + idTemplate).classList.add('btn-open-menu');
    this.clickedMenuOpened.emit(idTemplate);
  }

  onMenuClosed(templateIndex: number, idTemplate: number) {
    document.querySelector('#plantilla-' + templateIndex + '-' + idTemplate).classList.remove('btn-open-menu');
  }

  onDesactivarPlantilla(idTemplate, nameTemplate, blockIndex) {
    const event = {
      idTemplate,
      nameTemplate,
      blockIndex
    };

    this.clickedDisabledTemplate.emit(event);
  }

}
