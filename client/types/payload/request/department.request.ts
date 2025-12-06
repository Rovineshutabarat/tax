import { z } from "zod/v3";

export const DepartmentRequest = z.object({
  name: z
    .string()
    .min(1, "Department name is required")
    .max(100, "Department name cannot exceed 100 characters"),
  description: z.string().min(1, "Department name is required"),
});

export type DepartmentRequest = z.infer<typeof DepartmentRequest>;
