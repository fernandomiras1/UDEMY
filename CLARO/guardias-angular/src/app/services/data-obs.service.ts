import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataObsService {
  selectTimeCalendar = new EventEmitter();
  filterGroups = new EventEmitter();
  validacionTelefonica = new EventEmitter();
  date = new EventEmitter();
  dndDropzoneDisabled = new EventEmitter();
  refreshGrid: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
}
