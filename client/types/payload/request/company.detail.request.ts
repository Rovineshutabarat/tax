import { z } from "zod/v3";
import { CompanyType } from "@/types/enums/company.type";

export const CompanyDetailRequest = z.object({
  businessSectorId: z
    .number({
      required_error: "Business Sector ID is required",
      invalid_type_error: "Business Sector ID must be a number",
    })
    .positive("Business Sector ID must be a positive number"),

  companyType: CompanyType,
});

export type CompanyDetailRequest = z.infer<typeof CompanyDetailRequest>;
