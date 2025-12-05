import { z } from "zod/v3";

export const GrossNetOption = z.enum(["GROSS", "GROSS_UP", "NET"]);

export type GrossNetOption = z.infer<typeof GrossNetOption>