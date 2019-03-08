import { TypeEnum } from '../enums/Enums';

export interface ICruisingSalaryManagerFilter {
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
  WithNovelty?: boolean;
}

export interface CruisingSalaryListModel {
  items: CruisingSalaryItems[];
  items_count: number;
}

export interface CruisingSalaryItems {
  Id: number;
  Month: string;
  Cuit: string;
  EmployeeName: string;
  Location: string;
  FormattedBasicSalary: string;
  FormattedOnAccountSalary: string;
  FormattedNetSalary: string;
  AdditionalSalary: string;
  TotalSalary: string;
  CatDate: string;
  AgreementCoefficient: string;
  GrossSalary: string;
  NoveltyAmount: string;
  NoveltyTypes: string;
  Observations: string;
  AdditionalInformation: string;
  StatusDescription: string;
  StatusId: number;

  BasicSalary: number;
  OnAccountSalary: number;
  NetSalary: number;
  DistributionPercentaje: number;
}

export interface ISalaryDistributionBindingModel extends CruisingSalaryItems {
  newBasicSalary: number;
  newOnAccountSalary: number;
  newDistributionPercentaje: number;
}
