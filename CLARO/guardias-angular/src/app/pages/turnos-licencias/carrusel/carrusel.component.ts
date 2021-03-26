import { Component, OnInit, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';
import * as moment from 'moment';
import { GeneralService } from '@app/services/general.service';
import { DataObsService } from '@app/services/data-obs.service';
import { TurnosLicenciasService } from '../../../services/turnos-licencias.service';
import { SessionManagerService } from "../../../services/session-manager.service";

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent implements OnInit {
  @Input() guardias;
  @Input() licencias;
  @Input() dateSelected;
  @Input() grupo;
  
  draggable = {
    effectAllowed: "all",
    disable: false,
    handle: false
  };
  config: SwiperOptions = {
    autoHeight: false,
    height: 45,
    allowTouchMove: false,
    spaceBetween: 0,
    breakpoints: {
      1024: {
        slidesPerView: 12
      },
      500: {
        slidesPerView: 3
      },
      400: {
        slidesPerView: 2
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
  messageTooltip = {
    license: {
      txt1: 'El dia de hoy se',
      txt2: 'encuentra de licencia'
    },
    disable: {
      txt1: 'No tiene validados los',
      txt2: 'teléfonos de contacto'
    },
  }
  constructor(public generalService: GeneralService,
              private dataobsservice: DataObsService,
              private turnosService: TurnosLicenciasService
              ) { }

  ngOnInit(): void {
    this.setStatusGuardias()
    this.highlightSupervisor()
  }

  highlightSupervisor() {
    if(this.isSupervisor()) {
      let user_id = SessionManagerService.user().id_usuario
      let guard = this.findSupervisor(user_id)
      this.setSupervisorAtBeginning(guard.supervisor,guard.index);
    }
  }
  
  isSupervisor(){
    if(SessionManagerService.user().role = 'jefe-guardia') {
      return true;
    }
    return false
  }

  findSupervisor(supervisor_id){
    let index;
    let supervisor = this.guardias.find((guard,i) => {
      if(guard.id_usuario == supervisor_id) {
        guard.statusClass = 'bg-color-claro';
        index = i;
        return guard;
      }
    })
    return { supervisor, index }
  }

  setSupervisorAtBeginning(supervisor,index) {
    if(supervisor) {
      this.guardias.splice(index,1)
      this.guardias = [supervisor].concat(this.guardias)
    }
  }

  setStatusGuardias() {
    let guardsActive = [];
    let guardsInactive = [];
    this.guardias.forEach(guardia => {
      guardia.statusClass = 'item-carousel-bg-' + this.turnosService.statusGuardsCarousel(guardia, this.licencias, this.dateSelected);
      guardia.status = this.turnosService.statusGuardsCarousel(guardia, this.licencias, this.dateSelected);
      if(guardia.status === 'active' || guardia.status === 'license') {
        guardsActive.push(guardia);
      } else {
        guardsInactive.push(guardia);
      }
    });
    this.guardias = [...guardsActive, ...guardsInactive];
  }
  swiperPrev(positionSwiper) {
    positionSwiper.swiper.slidePrev();
  }
  swiperNext(positionSwiper) {
    positionSwiper.swiper.slideNext();
  }
  
  onDragStart(user) {
    if(!this.isGrupal && user.status === 'license') {
      this.dataobsservice.dndDropzoneDisabled.emit(true);
    }
  }
  onDragEnd() {
    this.dataobsservice.dndDropzoneDisabled.emit(false);
  }
  onDragCanceled() {
    this.dataobsservice.dndDropzoneDisabled.emit(false);
  }

  get isGrupal(): boolean
  {
    return this.grupo.programacion_grupal == '1';
  }

  
}
