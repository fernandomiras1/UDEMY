import { DtoPms } from './DtoPms';
import { DtoProjects } from './DtoProjects';

export interface DtoEmployee {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
}

export class EmployeeDetail {
 EmpId: number;
 ManagerId?: number;
 PMs: string;
 Projects: string;
 Area: string;
 TotalNetSalary: number;
 EstimatedNetSalary: number;
 PreviousLiquidatedSalary: number;
}

export interface EmployeeCruise {
  Net: number;
  Additional: number;
  Total: number;
  IncrementPercentage?: number;
  NewAdditionalSalary?: number;
  NewNetSalary?: number;
  IsRetroactive?: boolean;
  RetroactiveAmount?: number;
  RetroactiveMonthCount?: number;
  RetroactiveDate?: Date;
  Month?: number;
  Year?: number;
}
