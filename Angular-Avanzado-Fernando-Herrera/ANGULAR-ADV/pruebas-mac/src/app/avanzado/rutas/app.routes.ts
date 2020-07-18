import { IncrementadorComponent } from '../../intermedio2/incrementador/incrementador.component';
import { MedicoComponent } from '../../intermedio2/medico/medico.component';
import { HospitalComponent } from '../../intermedio2/hospital/hospital.component';

import { Routes } from '@angular/router';

export const RUTAS: Routes = [
  { path: 'hospital', component: HospitalComponent },
  { path: 'medico/:id', component: MedicoComponent },
  { path: '**', component: IncrementadorComponent }
];


