
export interface TurnUserByColor {
  indexGroup: number;
  idusuario: number;
  bgColor?: string;
}

export interface groupAssignation {
    id_user: string|number;
    id_plantilla_tipo_guardia: string|number;
    id_horario_grupo: string|number;
    fecha_inicio: string;
    fecha_repeticion_hasta: string;
    fecha_repeticion_hasta_real: string;
    id_rango_horario: string|number;
    id_dropdown_repeticion: string|number;
    id_grupo: string|number;
    descripcion: string;
    dias_repeticion?: string;
    dia_todos_los_meses?: repetitionDay[];
    personalizado_cada?: personalizedEach[];
    programacion_grupal: boolean;
}

interface repetitionDay {
  dia: string
}

interface personalizedEach {
  cada: string;
  tipo: string;
}
