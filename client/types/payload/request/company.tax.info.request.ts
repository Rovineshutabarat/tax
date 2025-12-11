import { z } from "zod/v3";

export const CompanyTaxInfoRequest = z.object({
  taxId: z.string().regex(/^[0-9]{15}$/, "Tax ID must be exactly 15 digits"),
  isVatRegistered: z.boolean().optional(),
  businessActivityCode: z
    .string()
    .regex(/^[0-9]{5,10}$/, "Business activity code (KLU) code must be 5–10 digits")
});

export type CompanyTaxInfoRequest = z.infer<typeof CompanyTaxInfoRequest>;
