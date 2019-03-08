export interface IChecklistDTO {
    Codigo: number;
    ConfiguracionChecklist: IConfiguracionChecklist;
    Mensaje: string;
}

export interface IConfiguracionChecklist {
    IdChecklistEnActoProcedimental: number;
    IdConfiguracionChecklist: number;
    ItemsDeConfiguracion: Array<ItemsDeConfiguracion>;
}

export interface ItemsDeConfiguracion {
    Id: number;
    Chequeable: boolean;
    IdItemDeConfiguracionChecklistPadre: number;
    Leyenda: string;
    NumeroOrden: string;
    Observaciones: string;
    PosiblesValoresDeRespuesta: Array<IPosiblesValoresDeRespuesta>;
    Texto: string;
    TipoDeItem: string;
}

export interface IPosiblesValoresDeRespuesta {
    Nombre: string;
    PermiteObservaciones: boolean;
    Seleccionado: boolean;
}

export interface IRequestCheckPreinduccion {
    IdActoProcedimental: number;
    NombreTipoDeChecklist: string;
}


// DTO - Actualizacion CheckList
export interface IUpdateChecklistDTO {
    TipoDeItem: string;
    IdActoProcedimental: number;
    ChecklistEnActoProcedimental: IChecklistEnActoProcedimental;
}

export interface IChecklistEnActoProcedimental {
    IdChecklistEnActoProcedimental: number;
    IdConfiguracionChecklist: number;
    ItemsChecklistEnActoProcedimental: any;
}

export interface ItemsChecklistEnActoProcedimental {
    IdItemDeChecklistEnActoProcedimental: number;
    IdItemDeConfiguracionChecklist: number;
    PosiblesValoresDeRespuesta: Array<IPosiblesValoresDeRespuesta>;
    Observaciones: string;
}
