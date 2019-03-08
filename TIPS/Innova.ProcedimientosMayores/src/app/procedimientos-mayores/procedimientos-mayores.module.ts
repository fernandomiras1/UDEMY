import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedimientosMayoresComponent } from './procedimientos-mayores.component';

// Tips Comun
import { 
  TipsComunModule,TipsInputModule, SpinnerModule, ErrorModule,
  ErrorInternoModule, PaginadorModule} from 'tips.comun';

import { HceServicioBase } from '../common/hce.servicio.base';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Servicios
import { ProcedimientosMayoresService } from './procedimientos-mayores.service';
// Componentes (Procediminetos Mayores)
import { ParticipantesComponent } from './general/participantes/participantes.component';
import { TiemposComponent } from './general/tiempos/tiempos.component';
import { ChecklistComponent } from './general/checklist/checklist.component';
import { RecursosComponent } from './general/recursos/recursos.component';
import { ConteosComponent } from './general/conteos/conteos.component';
import { FiltroPermisoConsultarPipe } from '../common/filtro-permiso-consultar.pipe';
import { NotaPreoperatoriaComponent } from './cirugia/nota-preoperatoria/nota-preoperatoria.component';
import { FojaQuirurgicaComponent } from './cirugia/foja-quirurgica/foja-quirurgica.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerminologiaModule} from 'innova.terminologia';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GestionDocumentosModule} from 'innova.comun';
import { DocPlantillasComponent } from './plantilla-documentos/doc.plantillas.component';
import { ProcedimientosComponent } from './cirugia/procedimientos/procedimientos.component';
import { GeneralService } from './general/general.service';
import { CirugiaService } from './cirugia/cirugia.service';
import { AppService } from '../common/app.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,        
    NgbModule.forRoot(),
    TipsInputModule,
    TipsComunModule.forRoot(),    
    ReactiveFormsModule,
    SpinnerModule,
    ErrorModule,
    ErrorInternoModule,
    BrowserAnimationsModule,
    TerminologiaModule,
    GestionDocumentosModule,
    PaginadorModule
    ],
  declarations: [
      ProcedimientosMayoresComponent, 
      ParticipantesComponent, 
      TiemposComponent, 
      ChecklistComponent,
      RecursosComponent, 
      ConteosComponent,
      FiltroPermisoConsultarPipe,
      NotaPreoperatoriaComponent,
      FojaQuirurgicaComponent,
      DocPlantillasComponent,
      ProcedimientosComponent
    ],
  providers: [ 
      HceServicioBase,
      ProcedimientosMayoresService,
      GeneralService,
      CirugiaService,
      AppService
    ],
  exports: [ ProcedimientosMayoresComponent ]
})
export class ProcedimientosMayoresModule { 
}
