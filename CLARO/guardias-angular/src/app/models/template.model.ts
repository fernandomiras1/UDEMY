
export interface Template {
  estado: string;
  hora_inicio: string;
  id_horario_guardia: string;
  id_tipo_guardia: number;
  nombre_tipo_de_guardia: string;
  plantillasHorarios: TemplateHours[];
  rango_hour: BetweenHours[];
  selected: boolean;
  timezone: null;
}

export interface TemplateHours {
  horario_desde: string;
  horario_hasta: string;
}

export interface BetweenHours {
  horario_desde: string;
  horario_hasta: string;
  id_rango_horario: string;
  id_tipoguardia: string;
}
