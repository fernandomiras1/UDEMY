import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';

//  Estas van a ser las Routas Hijas 

export const dashboardRoutes: Routes = [

    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-egreso', component: IngresoEgresoComponent },
    { path: 'detalle', component: DetalleComponent }
    
];