import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TIME_RANGE, SET_TEMPLATES } from '@utils/static.data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorMsg, infoMsg } from '@app/utils/message.validator';
import { timeFormat, hourFormat } from '@app/utils/templates.times';
import { PlantillasService } from '@app/services/plantillas.service';

@Component({
  selector: 'app-nueva-plantilla',
  templateUrl: './nueva-plantilla.component.html',
  styleUrls: ['./nueva-plantilla.component.scss']
})
export class NuevaPlantillaComponent implements OnInit {
  nuevaPlantillaForm: FormGroup;
  isNuevaPlantillaSubmitted = false;
  dayCycle = 'am';
  minMinutes = 0;
  maxMinutes = 30;
  minRango = 4;
  rangoHorario = TIME_RANGE;
  setTemplates = SET_TEMPLATES; // new
  blockIndex: number;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private matsnackBar: MatSnackBar,
              private plantillasService: PlantillasService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createFrom();
    this.route.queryParams.subscribe(params => {
      this.blockIndex = Number(params.blockIndex) || 0;
      if (this.blockIndex !== 0) {
        this.changeBlockTimes(this.blockIndex);
      }
    });

    this.plantillasService.getTemplates().subscribe(resu => {
      this.setBlocks(resu);
    });
  }

  createFrom() {
    this.nuevaPlantillaForm = this.fb.group({
      nombre_tipo_de_guardia: ['', Validators.required],
      timezone: ['GMT-03', Validators.required],
      /*horario_guardia: ['6HORAS', Validators.required],*/
      hora_inicio: [ '00:00', Validators.required],
      rango_horario: [ TIME_RANGE ]
    });
  }

  printAMPM(horario: string) {
    return ( 12 > this.int(horario.replace(/^(\d+).+/, '$1')) ) ? 'am' : 'pm';
  }

  setTime(direction = 'up') {
    let hour = this.getTimeFormat();
    let minutes = this.getTimeFormat('minutes');
    const isMaxMin = (this.maxMinutes === minutes);
    const isUp = ('up' === direction);
    if ( isUp ) {
      hour = (isMaxMin) ? ++hour : hour;
    } else {
      hour = (isMaxMin) ? hour : --hour;
    }
    minutes = (isMaxMin) ? timeFormat(this.minMinutes) : this.maxMinutes;
    const newValue = hourFormat(hour) + ':' + minutes;
    this.setHoraInicioFromForm(newValue);
    this.changeBlockTimes();
    this.changeDayCycle();
  }

  setBlocks(blocks: any): void {
    this.setTemplates = SET_TEMPLATES;
    for (let i = 0, j = this.setTemplates.length ; i < this.setTemplates.length; i++, j--) {
      this.setTemplates[i].allValues = blocks[j];
    }
  }

  changeDayCycle() {
    const hora = this.getTimeFormat();
    this.dayCycle = (11 < hora) ? 'pm' : 'am';
  }


  getHoraInicioFromForm() {
    return this.nuevaPlantillaForm.get('hora_inicio').value;
  }

  setHoraInicioFromForm(newValue) {
    this.nuevaPlantillaForm.get('hora_inicio').setValue(newValue);
  }

  getTimeFormat(type = 'hour', time = this.getHoraInicioFromForm()) {
    let timePattern = /^(\d+):.+/;
    if ('minutes' === type) {
      timePattern = /.+:(\d+)$/;
    }
    return this.int(time.replace(timePattern, '$1'));
  }


  setTimeRango(direction = 'up', rangoIndex = '0', type = 'start') {
    const isUp = ('up' === direction);
    if ( ('0' === rangoIndex && 'start' === type) ||  (this.rangoHorario.length === this.int(rangoIndex) + 1 && 'end' === type) ) {
      return this.setTime(direction);
    }
    const rango = this.rangoHorario[rangoIndex];
    const setNewHour = (currentHour: number) => (isUp) ? this.int(currentHour) + 1 : this.int(currentHour) - 1;
    let newHour: number;
    let minutes: number;
    let horario: string;
    let hourDiff: number;
    let modifyRangoIndex: number;
    let modifyRangoHorario: string;
    let ModifyRangoDiff: number;
    switch (type) {
      case 'start': {
        horario = 'horario_desde';
        modifyRangoHorario = 'horario_hasta';
        const hour1 = this.getTimeFormat('hour', rango.horario_desde);
        const hour2 = this.getTimeFormat('hour', rango.horario_hasta);
        minutes = this.getTimeFormat('minutes', rango.horario_desde);
        modifyRangoIndex = this.int(rangoIndex) - 1;
        const modifyRango = this.rangoHorario[modifyRangoIndex];
        const modifyRangoHora = this.getTimeFormat('hour', modifyRango.horario_desde);
        newHour = setNewHour(hour1);
        hourDiff = (hour2 < newHour) ? Math.abs(newHour - (24 + hour2)) : Math.abs(hour2 - newHour);
        ModifyRangoDiff = (modifyRangoHora > newHour) ? Math.abs((24 + newHour) - modifyRangoHora) : Math.abs(modifyRangoHora - newHour);
        break;
      }
      default: {
        horario = 'horario_hasta';
        modifyRangoHorario = 'horario_desde';
        const hour1 = this.getTimeFormat('hour', rango.horario_hasta);
        const hour2 = this.getTimeFormat('hour', rango.horario_desde);
        minutes = this.getTimeFormat('minutes', rango.horario_hasta);
        modifyRangoIndex = this.int(rangoIndex) + 1;
        const modifyRango = this.rangoHorario[modifyRangoIndex];
        const modifyRangoHora = this.getTimeFormat('hour', modifyRango.horario_hasta);
        newHour = setNewHour(hour1);
        hourDiff = (newHour < hour2) ? Math.abs(hour2 - (24 + newHour)) : Math.abs(hour2 - newHour);
        ModifyRangoDiff = (newHour > modifyRangoHora) ? Math.abs((24 + modifyRangoHora) - newHour) : Math.abs(modifyRangoHora - newHour);
      }
    }
    const newTime = hourFormat(newHour) + ':' + timeFormat(minutes);
    if ( this.minRango <= hourDiff && this.minRango <= ModifyRangoDiff ) {
      this.rangoHorario[rangoIndex][horario] = newTime;
      this.rangoHorario[modifyRangoIndex][modifyRangoHorario] = newTime;
    } else {
      infoMsg(this.matsnackBar,
        'El mínimo de horas de un bloque es de 4 horas.',
        'OK'
      );
    }
  }


  onTimeKeyPress(evt: KeyboardEvent, blockKey?) {
    const isUpKey = ('ArrowUp' === evt.key);
    const isDownKey = ('ArrowDown' === evt.key);
    const isAllowedKey = ('Tab' === evt.key);
    if ( isUpKey ) {
      if ( blockKey ) {
        this.setTimeRango('up', blockKey);
      } else {

      }
    }
    if ( isDownKey ) {

    }
    if (!isAllowedKey) {
      evt.preventDefault();
    }
  }

  getRangoHoras(idx: number|string) {
    const hoursByBlock = this.getBlockHours(idx);
    const rangoHoras = [];
    for (let i = 0; i < hoursByBlock; i++) {
      rangoHoras.push('block' + (i + 1) );
    }
    return rangoHoras;
  }

  printBlockDescription(index: string) {
    const hours = this.getBlockHours(index) + ' horas';
    let order = '';
    switch (index) {
      case '0' :
        order = 'Primer ';
        break;
      case '1' :
        order = 'Segundo ';
        break;
      case '2' :
        order = 'Tercer ';
        break;
      case '3' :
        order = 'Cuarto ';
        break;
    }
    const description = (order) ? 'bloque: ' + hours : 'bloque';
    return order + description;
  }


  getBlockHours(index: number|string) {
    const rangohora = this.rangoHorario[index];
    const hourPattern = /^(\d+):.+/
    const start = rangohora.horario_desde.replace(hourPattern, '$1');
    const end = rangohora.horario_hasta.replace(hourPattern, '$1');
    let blockHour = ( '00' === end) ? 24 - this.int(start) : this.int(end) - this.int(start);
    if ( 0 > blockHour ) {
      blockHour = 24 - Math.abs(blockHour);
    }
    return (end === start) ? 24 : blockHour;
  }

  onSelectBlockHours(evt: Event, numBloques: number) {
    // const blockHour = hours + 'HORAS';
    /*this.nuevaPlantillaForm.get('horario_guardia').setValue(blockHour);*/
    const currentTarget =  evt.currentTarget as HTMLInputElement;
    currentTarget.parentElement.querySelector('.activeBlock').classList.remove('activeBlock');
    currentTarget.classList.add('activeBlock');
    this.changeBlockTimes(numBloques);
  }

  changeBlockTimes(numBloques = this.nuevaPlantillaForm.get('rango_horario').value.length) {
    const hora     = hourFormat(this.getTimeFormat());
    const minuto   = timeFormat(this.getTimeFormat('minutes'));
    switch (numBloques) {
      case 3:
        const horaHastaBlock1 = hourFormat(this.int(hora) + 8);
        const horaHastaBlock2 = hourFormat(this.int(hora) + 8 * 2);
        this.rangoHorario = [
          {
            horario_desde: hora + ':' + minuto,
            horario_hasta: horaHastaBlock1 + ':' + minuto
          },
          {
            horario_desde: horaHastaBlock1 + ':' + minuto,
            horario_hasta: horaHastaBlock2 + ':' + minuto
          },
          {
            horario_desde: horaHastaBlock2 + ':' + minuto,
            horario_hasta: hora + ':' + minuto
          }
        ];
        break;

      case 2:
        const horaHasta = hourFormat(this.int(hora) + 12);
        this.rangoHorario = [
          {
            horario_desde: hora + ':' + minuto,
            horario_hasta: horaHasta + ':' + minuto
          },
          {
            horario_desde: horaHasta + ':' + minuto,
            horario_hasta: hora + ':' + minuto
          }
        ];
        break;

      case 1:
        const horaMinutos = hora + ':' + minuto;
        this.rangoHorario = [
          {
            horario_desde: horaMinutos,
            horario_hasta: horaMinutos
          }
        ];
        break;

      default: // 4 bloques
        const horaHasta1 = hourFormat(this.int(hora) + 6);
        const horaHasta2 = hourFormat(this.int(hora) + 6 * 2);
        const horaHasta3 = hourFormat(this.int(hora) + 6 * 3);
        this.rangoHorario = [
          {
            horario_desde: hora + ':' + minuto,
            horario_hasta: horaHasta1 + ':' + minuto
          },
          {
            horario_desde: horaHasta1 + ':' + minuto,
            horario_hasta: horaHasta2 + ':' + minuto
          },
          {
            horario_desde: horaHasta2 + ':' + minuto,
            horario_hasta: horaHasta3 + ':' + minuto
          },
          {
            horario_desde: horaHasta3 + ':' + minuto,
            horario_hasta: hora + ':' + minuto
          }
        ];
        break;
    }
    this.nuevaPlantillaForm.get('rango_horario').setValue(this.rangoHorario);
  }

  int(value) {
    return parseInt(value, 10);
  }

  onAddPlantilla() {
    const goToListPlantillas = () => {
      this.goToModificar();
    };
    this.plantillasService.addPlantilla(this.nuevaPlantillaForm.value).subscribe(
      (resp: any) => {
        if (resp && resp.success) {
          goToListPlantillas();
          return;
        }
        errorMsg(this.matsnackBar,
          `Algo salió mal: ${ (resp.message && resp.message.nombre_tipo_de_guardia) || 'Intente nuevamente en unos minutos o contacte a soporte técnico'}.`,
          'OK'
        );
        console.error('Something was wrong saving Plantilla.', resp);
      },
      err => {
        errorMsg(this.matsnackBar,
          'Error al intentar guardar el cambio, intente nuevamente o contacte a soporte técnico.'
        );
        console.error('Error adding Plantilla', err);
      }
    );
    console.log('addPlantilla');
  }

  goToModificar() {
    this.router.navigateByUrl('/plantilla/listar');
  }

  get f() { return this.nuevaPlantillaForm.controls; }

}
