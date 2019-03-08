import { TypeEnum } from '../enums/Enums';

export interface ISalaryToPayFilterData {
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
  TypeId: TypeEnum;
  MinDiffWithCruisingSalary: string;
  MaxDiffWithCruisingSalary: string;
  MinDiffWithPreviousMonth: string;
  MaxDiffWithPreviousMonth: string;
  WithNovelty?: boolean;
}

export interface SalaryToPayListModel {
  items: SalaryToPayItems[];
  items_count: number;
}

export interface SalaryToPayItems {
  Id: number;
  Month: string;
  Cuit: string;
  EmployeeName: string;
  AdministrationComments: string;
  AdditionalInformation: string;
  StatusDescription: string;
  Justification: string;
  StatusId: number;
  NoveltyTypes: string;
  ToPayNetSalary: string;
  CruisingNetSalary: string;
  IncomeTaxRetention: string;
  DiffWithPreviousSalary: string;
  DiffWithCruisingSalary: string;
  PreviousNetSalary: string;
}
