export interface IParticipante {
    Participantes: Array<Participante>;
    Roles: Array<Roles>;
}

export interface Participante {
    IdParticipante: number;
    IdRecurso: number;
    IdRol: number;
    IdServicio: number;
    MensajeEliminacion: string;
    PermiteDesmarcarComoPrincipal: boolean;
    PermiteEliminar: boolean;
    Nombre: string;
    ResponsablePrincipal: boolean;
    Rol: string;
    Servicio: string;
}

export interface Roles {
    Id: number;
    Nombre: string;
}

export interface IBuscarParticipantes {
    IdActoProcedimental: number;
    Nombre: string;
    Apellido: string;
}

// DTO - Actualizar Participantes
export interface IUpdateParticipante {
    TipoDeItem: string;
    IdActoProcedimental: number;
    Participantes: Array<UpdateParticipante>;
}

export interface UpdateParticipante {
    IdParticipante: number;
    IdRecurso: number;
    IdServicio: number;
    IdRol: number;
    ResponsablePrincipal: boolean;
}