
export class GroupSites {
  constructor(
    public users: UserSite[],
    public sites: Site[],
    public dataGroup: DataGroupSite,
  ) { }
}

export interface Site {
  localidad: string;
  name: string;
  selected: boolean;
  estado?: number;
  tecnologia?: string;
}

export interface UserSite {
  apellido: string;
  celular: string;
  department: string;
  email: string;
  grupos_asociados: GroupAssociated[];
  idusuario: string;
  legajo_corpo: string;
  nivel_jerarquico: null;
  nombre: string;
  person_id: string;
  profile_configured: boolean;
  selected: boolean;
  telefono: string;
  usuario_remedy: string;
  estado?: number;
}

export interface GroupAssociated {
  celular_corporativo_requerido: string;
  celular_guardia_requerido: string;
  descripcion: string;
  estado: string;
  gmt: string;
  id_grupo: string;
  id_tipo_grupo: string;
  id_usuario_jefe: string;
  linea_rotativo: string;
  linea_rotativo_requerido: string;
  nombre_grupo: string;
  timezone: string;
}

export interface DataGroupSite {
  apellido_jefe: string;
  cant_sitios: number;
  cant_usuarios: number;
  celular_corporativo_requerido: boolean;
  celular_guardia_requerido: boolean;
  descripcion: string;
  estado: string;
  gerencia: string;
  id_grupo: string;
  id_tipo_grupo: string;
  id_usuario_jefe: string;
  is_editable: boolean;
  linea_rotativo: string;
  linea_rotativo_requerido: boolean;
  logged_user_present: boolean;
  nombre_grupo: string;
  nombre_jefe: string;
  plantilla_tipo_guardia: any;
  sitios: any[];
  support_group_name: string;
  todosUsuarios: DetailGroupUser[];
  usuarios: RemedyUser;
}

export interface RemedyViews {
  people: UserSite[];
  sites: Site[];
}

export interface UpdateGroup {
  users: UserSite[];
  sites: Site[];
  resu: boolean;
}
export interface AddNewGroup {
  users: UserSite[];
  sites: Site[];
  valid: boolean;
}

export interface DeletedUsers {
  date_now: string;
  id_group: string;
  id_user_login: string;
  users: User[];
}

// tecno

export interface TecnoSelected {
  grupo_remedy: string;
  selected: boolean;
  tecnologia: string;
}
export interface RemedyGroup {
  acronimos: string[];
  acronimosDetalle: any[];
  countSites: number;
  nombre: string;
  selected: boolean;
  tecnologia: string;
}

export interface RemedyUser {
  cant_usuarios: number;
  grupo_remedy: string;
  usuarios: User[];
}

export interface RespRemedyGroups {
  message: any[];
  success: string;
}

export interface RemedyList {
  people: any[];
  sites: SiteList[];
}

export interface SiteList {
  nombre?: string;
  acronimos?: any[];
  tecnologia?: string;
  estado?: number;
  selected?: boolean;
}

export interface User {
  apellido: string;
  cantidad_sitios: string;
  grupos_asociados: GroupAssociated[];
  idusuario: string;
  legajo_corpo: string;
  nivel: string;
  nombre: string;
  profile_configured: boolean;
  selected: boolean;
  support_group_name: string;
  id_user_group?: string;
}

export interface DetailGroupUser {
  apellido: string;
  celular: string;
  department: string;
  email: string;
  grupos_asociados: GroupAssociated[];
  idusuario: string;
  legajo_corpo: string;
  nivel_jerarquico: string;
  nombre: string;
  person_id: string;
  profile_configured: boolean;
  selected: boolean;
  telefono: string;
  usuario_remedy: string;
}

export interface SubCategories {
  categories: Categorie[]
}

export interface Categorie {
  category: string;
  options: CateOption[];
}

export interface CateOption {
  id: number;
  name: string;
}
