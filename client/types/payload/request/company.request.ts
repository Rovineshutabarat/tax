import { z } from "zod/v3";
import { CompanyInfoRequest } from "@/types/payload/request/company.info.request";
import { CompanyLegalRegistrationRequest } from "@/types/payload/request/company.legal.registration.request";
import { CompanyTaxInfoRequest } from "@/types/payload/request/company.tax.info.request";
import { CompanyAddressRequest } from "@/types/payload/request/company.address.request";

export const CompanyRequest = CompanyInfoRequest
  .merge(CompanyLegalRegistrationRequest)
  .merge(CompanyAddressRequest)
  .merge(CompanyTaxInfoRequest)

export type CompanyRequest = z.infer<typeof CompanyRequest>;
