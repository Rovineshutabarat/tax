import { EmployeeStatus } from "@/types/enums/employee.status";
import { Gender } from "@/types/enums/gender";
import { MarriageStatus } from "@/types/enums/marriage.status";
import { Role } from "@/types/entity/role";
import { Department } from "@/types/entity/department";
import { Company } from "@/types/entity/company";

export type Employee = {
  id:number
  name: string;
  email: string;
  phoneNumber: string;
  taxId: string;
  baseSalary: number;
  employeeStatus: EmployeeStatus;
  birthDate: string;
  gender: Gender;
  marriageStatus: MarriageStatus;
  numberOfDependents: number;
  roles: Role[];
  department: Department;
  company: Company;
};
