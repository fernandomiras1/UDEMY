import { DtoEmployee } from '../DtoEmployee';
import { DtoManagers } from '../DtoManagers';
import { TypeEnum } from '../../enums/Enums';

export interface INoveltyManagerFilter {
  FromMonth: number;
  FromYear: number;
  UntilMonth: number;
  UntilYear: number;
  EmployeeId: number;
  ProjectId: number;
  ClientId: number;
  PmId: number;
  ManagerId: number;
  StatusId: number;
  TypeId: number;
  IncrementPercentageFrom: number;
  IncrementPercentageTo: number;
  WithRetroactive: boolean;
}
// New de Novelty
export interface INoveltyBindingModel {
  employee: DtoEmployee;
  approver: DtoManagers;
  observations: string;
  details: Array<INoveltyTypeListModel>;
}

// Edit de Novelty Type Recategorization
export interface INoveltyRecategorizationEdit {
  Id: number;
  Year: number;
  Month: number;
  PeriodDate?: Date;
  Employee?: DtoEmployee;
  Approver: DtoManagers;
  Observations: string;
  IncrementPercentage: number;
  IsRetroactive: boolean;
  NewAdditionalSalary: number;
  NewNetSalary: number;
  NoveltyStatus: number;
  NoveltyType: TypeEnum;
  RetroactiveAmount: number;
  RetroactiveMonthCount: number;
  RetroactiveDate?: Date;
  RejectComments?: string;
  ObservedAdmComments?: string;
}

export interface INoveltyEdit {
  Employee?: DtoEmployee;
  Approver: DtoManagers;
  Observations: string;
  ObservedAdmComments?: string;
  Id: number;
  NoveltyType: TypeEnum;
  periodDate?: Date;
}

export interface IAtributeRecategorization extends INoveltyEdit {
  IncrementPercentage: number;
  IsRetroactive: boolean;
  NewAdditionalSalary: number;
  NewNetSalary: number;
  RetroactiveAmount: number;
  RetroactiveMonthCount: number;
  NewDifference: number;
  NewTotal: number;
  NoveltyDescription: string;
}

// Modelo de la grilla de tipos de Novedades
export interface INoveltyTypeListModel {
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
