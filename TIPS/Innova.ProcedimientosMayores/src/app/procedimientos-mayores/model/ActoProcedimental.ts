
export interface IActoProcedimentalDTO {
    Codigo: number;
    EstructuraDeActoProcedimental: EstructuraDeActoProcedimental;
    Mensaje: string;
}

export interface EstructuraDeActoProcedimental {
    Cabecera: Cabecera;
    Secciones: Secciones;
    SeccionDocumentos: SeccionDocumentos;
    SeccionHistorico: SeccionHistorico;
}

export interface Cabecera {
     Fecha: string;
     InicioEstimado: string;
     DuracionEstimada: string;
     Procedimientos: Array<string>;
     ProfesionalACargo: Profesional;
}

export interface Profesional {
    Nombre: string;
    Servicio: string; 
 }

export interface SeccionDocumentos {
     Documentos: Array<Documentos>;
     Permisos: Permisos;
}

export interface Documentos {
    Nombre: string;
    IdDocumento: number;
}

export interface Permisos {
    Consulta: boolean;
    Deshabilitar: boolean;
    Edicion: boolean;
}

export interface SeccionHistorico {
     Permisos: Permisos;
}

export interface Secciones {
    IdSeccion: number;
    Items: Array<ItemSeccionProcedimiento>;
    Nombre: string;
}

export interface ItemSeccionProcedimiento {
    IdItem: number;
    Auditoria: string;
    Estado: string;
    Icono: string;
    Tipo: string;
    Permisos: Permisos;
}

export interface IActoProcedimentalRequest {
    IdActoProcedimental: number;
}

export interface ICambiarEstadoDeItemRequest {
    IdItem: number;
    Habilitado: boolean;
}