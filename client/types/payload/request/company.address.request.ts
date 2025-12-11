import { z } from "zod/v3";
import { Address } from "@/types/entity/address";

export const CompanyAddressRequest = z.object({
  address: Address,
});

export type CompanyAddressRequest = z.infer<typeof CompanyAddressRequest>;
