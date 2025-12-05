import { Address } from "@/types/entity/address";
import { CompanyType } from "@/types/enums/company.type";
import { BusinessSector } from "@/types/entity/business.sector";
import { CompanyPayrollSetting } from "@/types/entity/company.payroll.setting";

export type Company = {
  name: string;
  companyPayrollSetting: CompanyPayrollSetting;
  taxId: string;
  businessRegistrationNumber: string;
  tradeLicenseNumber: string;
  email: string;
  phoneNumber: string;
  address: Address;
  companyType: CompanyType;
  businessSector: BusinessSector;
  establishedAt: string;
};
