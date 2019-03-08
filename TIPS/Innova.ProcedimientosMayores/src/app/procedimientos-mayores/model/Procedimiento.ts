export interface ProcedimientoDTO {
    ProcedimientosPostoperatorios: Array<Procedimiento>;
    ProcedimientosPreoperatorios: Array<Procedimiento>;
}

export interface Procedimiento {
    IdProcedimientoEnActo: number;
    IdTermino: number;
    MensajeEliminacion?: string;
    NombreProcedimiento: string;
    PermiteEliminacion: boolean;
    Principal: boolean
}

// DTO - Actualizar Tiempo
export interface IUpdateProcedimiento {
    TipoDeItem: string;
    IdActoProcedimental: number;
    ProcedimientosPostoperatorios: Array<Procedimiento>;
}


//Lo nuevo
export interface ProcedimientoDto {
    EsPreferido?: boolean;
    EsTerminoValido?: boolean;
    EsValido?: boolean;
    IdDominio?: number;
    IdSinonimo?: number;
    IdTermino: number;
    IdTipoDeRefinamiento?: number;
    NombreDominio?: string;
    NombreSinonimo: string;
    Ponderacion?: number;
    TipoDeRefinamiento?: string;
}

export interface TerminologiaParams {
    IdDominioDeTerminologia: number;
}
    