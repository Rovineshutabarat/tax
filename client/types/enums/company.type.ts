import {z} from "zod/v3";

export const CompanyType = z.enum(["PT", "CV", "FIRMA" , "OTHER"]);

export type CompanyType = z.infer<typeof CompanyType>