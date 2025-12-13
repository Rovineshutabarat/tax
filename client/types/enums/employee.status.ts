import { z } from "zod/v3";

export const EmployeeStatus = z.enum(["ACTIVE", "RESIGNED"], {
  required_error: "Employee Status is required",
});

export type EmployeeStatus = z.infer<typeof EmployeeStatus>;
