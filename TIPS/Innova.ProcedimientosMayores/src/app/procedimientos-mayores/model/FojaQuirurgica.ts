export interface IObtenerFojaQuirurgicaRequest {
    IdActoProcedimental: number;
    IdItemEnActoProcedimental: number;
}

export interface IFojaQuirurgicaDTO {
    Codigo: number;
    FojaQuirurgica: IFojaQuirurgica;
    Mensaje: string;
}

export interface IFojaQuirurgica {
    AnestesiaAdministrada: string;
    ComienzoDeCirugia: string;
    Complicaciones: string;
    DiagnosticoPrincipal: string;
    DiagnosticosPrincipalesEnFoja: Array<PreoperatorioEnFojaDto>;
    DiagnosticosSecundarios: Array<string>;
    DiagnosticosSecundariosEnFoja: Array<PreoperatorioEnFojaDto>;
    Dispositivos: string;
    DispositivosProtesticos: string;
    DocumentosHallazgos: Array<IDocumentosHallazgos>;
    DuracionActoProcedimental: string;
    Especimenes: string;
    IdFojaQuirurgica: number;
    Injertos: string;
    ObservacionesComplicaciones: string;
    ObservacionesDispositivos: string;
    ObservacionesDispositivosProtesticos: string;
    ObservacionesEspecimenes: string;
    ObservacionesHallazgos: string;
    ObservacionesInjertos: string;
    ObservacionesPerdidaSangre: number;
    ObservacionesTejidos: string;
    ObservacionesTranfusiones: string;
    ParticipantesEnFoja: Array<ParticipantesEnFojaDto>;
    PerdidaSangre: string;
    ProcedimientoPrincipal: string;
    ProcedimientosPrincipalesEnFoja: Array<PreoperatorioEnFojaDto>;
    ProcedimientosSecundarios: Array<string>;
    ProcedimientosSecundariosEnFoja: Array<PreoperatorioEnFojaDto>;
    Tejidos: string;
    Tranfusiones: string;
}

export interface IDocumentosHallazgos {
    Id: number;
    Nombre: string;
    IdDocumento: number;
}

export interface ParticipantesEnFojaDto {
    Id: number;
    IdParticipanteEnActoProcedimental: number;
    Nombre: string;
    ResponsablePrincipal: boolean;
    Rol: string;
    Servicio: string;
}

export interface PreoperatorioEnFojaDto {
    Id: number;
    IdEnActo: number;
    IdTermino: number;
    NombreSinonimo: string;
}

// DTO - Actualizar FojaQuirurgica
export interface IUpdateFojaDTO {
    IdItem: number;
    TipoDeItem: string;
    IdActoProcedimental: number;
    FojaQuirurgica: IFojaQuirurgica;
}