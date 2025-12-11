import { Address } from "@/types/entity/address";
import { CompanyType } from "@/types/enums/company.type";
import { BusinessSector } from "@/types/entity/business.sector";
import { CompanyPayrollSetting } from "@/types/entity/company.payroll.setting";

export type Company = {
  name: string;
  email: string;
  phoneNumber: string;
  establishedAt: string;
  businessSector: BusinessSector;
  companyType: CompanyType;
  address: Address;
  companyPayrollSetting: CompanyPayrollSetting;
};
