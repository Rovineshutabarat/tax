import { z } from "zod/v3";
import { CompanyType } from "@/types/enums/company.type";

export const CompanyLegalRegistrationRequest = z.object({
  businessRegistrationNumber: z
    .string()
    .min(1, "Business Registration Number is required")
    .max(50, "Business Registration Number cannot exceed 50 characters")
    .regex(/^[A-Za-z0-9\-\/\.]+$/, "Invalid Business Registration Number format"),

  tradeLicenseNumber: z
    .string()
    .min(1, "Trade License Number is required")
    .max(50, "Trade License Number cannot exceed 50 characters")
    .regex(/^[A-Za-z0-9\-\/\.]+$/, "Invalid Trade License Number format"),

  businessSectorId: z
    .number({
      required_error: "Business Sector ID is required",
      invalid_type_error: "Business Sector ID must be a number",
    })
    .positive("Business Sector ID must be a positive number"),

  companyType: CompanyType,
});

export type CompanyLegalRegistrationRequest = z.infer<
  typeof CompanyLegalRegistrationRequest
>;
