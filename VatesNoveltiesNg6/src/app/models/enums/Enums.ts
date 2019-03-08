export enum NoveltyStatusEnum {
  Requested = 1,
  Rejected,
  Approved,
  Applied,
  ObservedAdm,
  ApprovedAdm
}

export enum TypeEnum {
  Alta = 1,
  Guardia,
  Premio,
  Baja,
  HorasExtras,
  Capacitacion,
  Deduccion,
  CambioDeModalidad,
  Licencia,
  NoLiquidar,
  Recategorizacion,
  Reubicacion
}

export enum CruisingSalaryStatusEnum {
  Pending = 1,
  Approved,
  Observed,
  Sent
}

export enum CommonMessageEnum {
  LessThanZero = 1,
  OnlyIntegerNumbers
}

export enum SalaryToPayStatusEnum {
  Pending = 1,
  Imported,
  Justified,
  Sent,
  Reconciled,
  Payed
}
