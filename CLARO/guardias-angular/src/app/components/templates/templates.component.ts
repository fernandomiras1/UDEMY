import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalTurnoComponent as AppModalTurnoComponent } from '@app/components/modal-turno/modal-turno.component';
import { PlantillasService } from '@app/services/plantillas.service';
import { ModalComponent } from 'angular-custom-modal';
import { Router } from '@angular/router';
import { SET_TEMPLATES } from '@utils/static.data';
import { MODE_STATUS_TEMPLATE } from '@app/utils/common.enum';
import { errorMsg } from '@app/utils/message.validator';
import { Template } from '@app/models/template.model';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {
  modeTemplate: typeof MODE_STATUS_TEMPLATE = MODE_STATUS_TEMPLATE;
  @ViewChild('htmlInsideModal') htmlInsideModal: ModalComponent;
  @Input() mode: MODE_STATUS_TEMPLATE;
  @Input() templatesSelectedById: number[];
  isLoading: boolean = true;
  config: SwiperOptions = {
    allowTouchMove: true,
    spaceBetween: 32,
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      500: {
        slidesPerView: 2
      },
      400: {
        slidesPerView: 1
      },
      300: {
        slidesPerView: 1
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: false
  };

  templateList: Template[] = [];
  setTemplates = SET_TEMPLATES;
  enableButtonIfAnySelected = false;
  verifiedDesactivarPlantillas = {};
  stepMinutes = 30;
  @Output() selectedTemplates: EventEmitter<Template[]> = new EventEmitter();

  constructor(
    private plantillasService: PlantillasService,
    private matDialog: MatDialog,
    private matsnackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
  
    this.plantillasService.getPlantillasServer().subscribe((res: { success: boolean, message: Template[]}) => {
      this.isLoading = false;
      this.templateList = res.message;
      this.templateList.forEach(val => {
        this.verifiedDesactivarPlantillas[val.id_tipo_guardia] = null;
      });
    });

    this.initEdtion();
    document.body.style.overflowY = 'scroll';
  }

  initEdtion(): void {
    this.plantillasService.getTemplates().subscribe((resu) => {
      this.isLoading = false;
      this.setBlocks(resu);
      this.deleteSelectedTemplatesInEditionMode();
    });
  }

  get showAddTemplateOption() {
     return this.mode == MODE_STATUS_TEMPLATE.LIST;
  }

  swiperPrev(positionSwiper) {
    positionSwiper.swiper.slidePrev();
  }
  swiperNext(positionSwiper) {
    positionSwiper.swiper.slideNext();
  }

  goBackSiteTec() {
    this.router.navigateByUrl('nuevo-grupo');
  }

  onNuevaPlantilla(blockIndex: number) {
    this.router.navigateByUrl('/plantilla/crear?blockIndex=' + blockIndex);
  }

  setBlocks(blocks): any {
    this.setTemplates = SET_TEMPLATES;
    for (let i = 0, j = this.setTemplates.length ; i < this.setTemplates.length; i++, j--) {
      this.setTemplates[i].allValues = blocks[j];
    }
  }

  deleteSelectedTemplatesInEditionMode(): void {
    
    if (this.mode !== MODE_STATUS_TEMPLATE.EDITION) {
      return;
    }

    for(let currentBlock of this.setTemplates ) {
      let allValues = [];
      for(let template of currentBlock.allValues ) {
        if(!this.templatesSelectedById.includes(template.id_tipo_guardia)) {
          allValues.push(template);
        }
      }
      currentBlock.allValues = allValues;
    }
  }

  onCardSelected(event): void {
    const { template, blockIndex } = event;
    if (this.mode === MODE_STATUS_TEMPLATE.SELECTION || this.mode === MODE_STATUS_TEMPLATE.EDITION) {
      if (this.startsAtTheSameTimeAsAnotherTemplate(template, blockIndex)) {
        this.htmlInsideModal.open();
      } else {
        template.selected = !template.selected;
      }

      this.createSelectedTemplates();
    }
  }

  startsAtTheSameTimeAsAnotherTemplate(template: Template, blockIndex: number): boolean {

    let startTimesOfAllTemplatesSelected:string[] = [];
    let selectedTemplateStartTime = template.rango_hour[0].horario_desde;

    for(let currentTemplate of this.setTemplates[blockIndex].allValues ) {
      if(currentTemplate.selected && currentTemplate.id_tipo_guardia != template.id_tipo_guardia){
        startTimesOfAllTemplatesSelected.push( currentTemplate.rango_hour[0].horario_desde );
      }
    }

    return startTimesOfAllTemplatesSelected.includes(selectedTemplateStartTime);
  }

  createSelectedTemplates() {
    const selectedTemplates: Template[] = [];
    for(const template of this.setTemplates) {
      template.allValues.forEach((temp: Template) => {
        if (temp.selected) {
          selectedTemplates.push(temp);
        }
      });
    }

    this.selectedTemplates.emit(selectedTemplates);
  }

  onDisabledTemplate(event) {
    const { idTemplate, nameTemplate, blockIndex} = event;
    const plantillaHorarios = this.setTemplates[blockIndex].allValues[blockIndex].rango_hour;
    const totalPlantillaHorarios = plantillaHorarios.length  - 1;
    let horariosInicio = '';
    plantillaHorarios.forEach((value, key) => {
      const and = (key === totalPlantillaHorarios) ? ' y ' : '';
      const comma = (key < totalPlantillaHorarios - 1) ? ', ' : '';
      horariosInicio += and + 'a las ' + value.horario_desde + comma;
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.panelClass = 'container-custom-modal';
    dialogConfig.width = '600px';
    dialogConfig.position = {
      top: '0',
      left: '0'
    };
    dialogConfig.data = {
      type: 'customized',
      name: `¿Está seguro que desea eliminar "${nameTemplate}"?`,
      // tslint:disable-next-line: max-line-length
      content: `<p><b class="modal-msg">Las guardias comienzan ${horariosInicio}.</b></p><br>
      <p>¿Estás seguro que quieres desactivar el rango de horarios?`,
      close: true,
      OKCallback: () => {
        this.desactivarPlantilla(idTemplate);
        modalDialog.close();
      },
      OKButtonName: 'Eliminar'
    };

    const modalDialog = this.matDialog.open(AppModalTurnoComponent, dialogConfig);
  }


  desactivarPlantilla(idTemplate: number) {
    this.plantillasService.removePlantilla(idTemplate).subscribe(
      (resp: any) => {
        if (resp && resp.success) {
          location.reload();
          return;
        }
        errorMsg (this.matsnackBar,
          'Algo salió mal al desactivar, intente nuevamente en unos minutos o contacte a soporte técnico.',
          'OK'
        );
        console.error('No retornó success:true al desactivar la plantilla.', resp);
      },
      err => {
        errorMsg (this.matsnackBar,
          'Error al intentar desactivar la plantilla, intente nuevamente o contacte a soporte técnico.'
        );
        console.error('Error desactivando Plantilla', err);
      }
    );
    console.log('Desactivar Plantilla', idTemplate);
  }

  verifyGroupsInPlantilla(idTemplate: number) {
    return this.plantillasService.verifyGroupsInPlantilla(idTemplate).subscribe(resp => {
      this.verifiedDesactivarPlantillas[idTemplate] = (!resp['message'].length);
      return this.verifiedDesactivarPlantillas[idTemplate];
    });
  }

  onMenuCardOpened(idTemplate: number): void {
    if ( null === this.verifiedDesactivarPlantillas[idTemplate] ) {
      this.verifyGroupsInPlantilla(idTemplate);
    }
  }

  ngOnDestroy(): void {
    document.body.style.removeProperty('overflowY');
  }

}

