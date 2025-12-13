import { z } from "zod/v3";

export const MarriageStatus = z.enum(["MARRIED", "SINGLE", "DIVORCED"], {
  required_error: "Marriage Status is required",
});

export type MarriageStatus = z.infer<typeof MarriageStatus>;
