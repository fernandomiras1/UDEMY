export interface ITiemposDTO {
   HitosEnActoProcedimental: Array<IHitosEnActoProcedimental>;
}

export interface IHitosEnActoProcedimental {
    IdHitoEnActoProcedimental: number;
    Fecha: string;
    TipoDeHito: string;
    TipoDeTiempo: string;
}

export interface ITiposHitos {
    estadiaInicio: IHitosEnActoProcedimental;
    estadiaFin: IHitosEnActoProcedimental;
    induccionInicio: IHitosEnActoProcedimental;
    induccionFin: IHitosEnActoProcedimental;
    cirugiaInicio: IHitosEnActoProcedimental;
    cirugiaFin: IHitosEnActoProcedimental;
    anestesiaFin: IHitosEnActoProcedimental;
}

// DTO - Actualizar Tiempo
export interface IUpdateTiempoDTO {
    TipoDeItem: string;
    IdActoProcedimental: number;
    HitosEnActoProcedimental: Array<any>;
}
