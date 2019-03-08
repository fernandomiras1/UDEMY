import { TypeEnum } from '../enums/Enums';
import { DtoEmployee } from './DtoEmployee';
import { DtoManagers } from './DtoManagers';
// Modelo de la grilla del Gestor de Novedades
export interface NoveltyListModel {
 items: NoveltyItems[];
 items_count: number;
}

export interface NoveltyItems {
  Month: string;
  EmployeeName: string;
  PreviousLiquidatedSalary: string;
  TotalNetSalary: string;
  RecategorizationPercentage: string;
  NoveltiesAmount: string;
  NoveltyTypes: string;
  EstimatedNetSalary: string;
  NoveltyStatusName: string;
  Approver: string;
  Observations: string;
  WithRetroactive: boolean;
  RetroactiveAmount: number;
  RetroactiveDate: string;
}
// New/Edit/View de Novelty
export class NoveltyBindingModel {
  employee: DtoEmployee;
  approver: DtoManagers;
  observations: string;
  // NoveltyStatus: NoveltyStatusEnum;
  details: Array<NoveltyTypeListModel>;
   constructor() {
    this.details = new Array<NoveltyTypeListModel>();
  }
}

// Modelo de la grilla de tipos de Novedades
export class NoveltyTypeListModel {
  NoveltyDescription: string;
  NoveltyType: TypeEnum;
  NewDifference: number;
  IncrementPercentage: number;
  NewAdditionalSalary: number;
  NewNetSalary: number;
  NewTotal: number;
  IsRetroactive: boolean;
  RetroactiveAmount: number;
  RetroactiveMonthCount: number;
  RetroactiveDate: Date;
}

export class IGuardBindingModel extends NoveltyTypeListModel {
  Client: any;
  Project: any;
  FixedAmount: boolean;
  CurrentMonth: boolean;
}

export class IExtraHourBindingModel extends NoveltyTypeListModel {
  TotalAmount: number;
  Percentage: number;
  BaseNumberHours: number;
  NumberHours: number;
  CurrentMonth: boolean;
}
