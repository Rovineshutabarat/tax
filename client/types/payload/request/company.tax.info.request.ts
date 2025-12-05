import { z } from "zod/v3";
import { GrossNetOption } from "@/types/enums/gross.net.option";

export const CompanyTaxInfoRequest = z.object({
  isVatRegistered: z.boolean().optional(),
  grossNetOption: GrossNetOption,
});

export type CompanyTaxInfoRequest = z.infer<typeof CompanyTaxInfoRequest>;
