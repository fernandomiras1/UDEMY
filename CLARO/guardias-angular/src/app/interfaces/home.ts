export interface optGroupService {
  group_order: String//orden de los grupos
  page: Number, //numero de pagina
  limit: Number, //cantidad de registros por pagina
  string_search: String, //string para busqueda exacta
  only_my_groups: Number, // checkbox "Ver solo mis grupos"
  string_exact_group_name: Boolean //activa busqueda exacta
}

export interface optSitioTecPersonalService {
  group_order: String//orden de los grupos
  page: Number, //numero de pagina
  limit: Number, //cantidad de registros por pagina
  string_search: String, //string para busqueda exacta
  only_my_groups: Number, // checkbox "Ver solo mis grupos"
  string_exact_group_name: Boolean //activa busqueda exacta
}