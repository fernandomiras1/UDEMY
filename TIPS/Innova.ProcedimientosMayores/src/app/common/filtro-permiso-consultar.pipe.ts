import { Pipe, PipeTransform } from '@angular/core';
import { ItemSeccionProcedimiento } from '../procedimientos-mayores/model/ActoProcedimental';

@Pipe({
  name: 'filtroPermisoConsultar'
})
export class FiltroPermisoConsultarPipe implements PipeTransform {

  transform(items: any[]): any {
    
   if (!items) {
      return items;
  }

    return items.filter(item => item.Items.some((seccion: ItemSeccionProcedimiento) => seccion.Permisos.Consulta || seccion.Permisos.Edicion ));
  }

}
