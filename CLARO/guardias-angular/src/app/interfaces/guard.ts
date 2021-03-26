export interface Userguard {
  apellido_usuario: string;
  celular_corporativo: string;
  celular_corporativo_requerido: string;
  celular_guardia: string;
  celular_guardia_requerido: string;
  estado: string;
  estado_grupo_usuario: string;
  id_grupo: string;
  id_tipo_grupo: string;
  id_usuario: string;
  id_usuario_jefe: string;
  legajo_corpo: string;
  linea_rotativo: any[];
  linea_rotativo_requerido: string;
  nombre_grupo: string;
  nombre_usuario: string;
  telefono_validado: number;
  active?: string
}
export interface AsignTurnGuard {
  //id usuario asignado en el turno
  id_user_asignado: String,
  // id usuaurio que está realizando la accion
  id_user: String,
  // id plantilla
  //supongo group_relation_planning[0].id_tipo_guardia
  id_plantilla_tipo_guardia: String,
  //id plantilla, el tipo de guardia y el grupo
  //supongo group_relation_planning[0].id_horario_grupo
  id_horario_grupo: String,
  //fecha ej 2019-10-20 23:59:00 en timestamp
  fecha_inicio: String,
  //fecha ej 2019-10-20 23:59:00 en timestamp
  fecha_repeticion_hasta: String,
  //fecha original para mostrar luego en la tarjeta final
  fecha_repeticion_hasta_real: String,
  //corresponde al bloque de horario
  //supongo group_relation_planning.[0]type_guardia.rango_hour[0].id_rango_horario
  id_rango_horario: String,
  //corresponde al select de repeticion
  id_dropdown_repeticion: String,
  //id del grupo al que se esta agregado no es necesario
  id_grupo: String,
  //los días que se seleccionaron separados por coma, nombre completo
  dias_repeticion: String,
  //descripcion de la repeticion de meses
  descripcion: String,
  //dia del mes que se repite el dia y si es la otra opcion es=> [{"dia": "asignado"}]
  dia_todos_los_meses: String[],
  //personalizado cantidad min 2 max 10 , tipo por ahora semana
  //si no es personalizado es personalizado_cada:[]
  personalizado_cada: String[]
}