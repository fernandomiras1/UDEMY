export interface NotaPreoperatoriaDTO {
    Codigo: number;
    NotaPreoperatoria: NotaPreoperatoria;
    UnidadesDeDestino: Array<UnidadesDeDestino>;
    Mensaje: string;
}

export interface NotaPreoperatoria {
    AnticipoDeCuidados: string;
    AptoValoracionPreanestesica: string;
    DiagnosticoPrincipal: string;
    DocumentacionCompleta: string;
    DiagnosticosSecundarios: Array<string>;
    ExplicaRiesgosOperativos: string;
    IdNotaPreoperatoria: number;
    IdUnidadDeDestino: number;
    ObservacionesAptoValoracionPreanestesica: string;
    ObservacionesDocumentacionCompleta: string;
    ObservacionesPacienteEnCondiciones: string;
    ObservacionesRiesgosOperativos: string;
    PacienteEnCondiciones: string;
    ProcedimientoPrincipal: string;
    ProcedimientosSecundarios: Array<string>;
}

export interface UnidadesDeDestino {
    Id: number;
    Nombre: string;
}

// DTO - Actualizar Nota Preoperatoria
export interface IUpdateNotaDTO {
    TipoDeItem: string;
    IdActoProcedimental: number;
    NotaPreoperatoria: NotaPreoperatoria;
}
