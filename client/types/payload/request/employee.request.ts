import { z } from "zod/v3";
import { MarriageStatus } from "@/types/enums/marriage.status";
import { EmployeeStatus } from "@/types/enums/employee.status";
import { Gender } from "@/types/enums/gender";

export const EmployeeRequest = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name must not exceed 50 characters."),

  email: z
    .string()
    .min(1, "Email is required.")
    .email("Email format is invalid.")
    .max(100, "Email must not exceed 100 characters."),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required.")
    .max(20, "Phone number must not exceed 20 characters."),

  taxId: z.string().regex(/^[0-9]{15}$/, "Tax ID must be exactly 15 digits"),

  baseSalary: z
    .number()
    .positive("Base salary must be greater than 0.")
    .refine((v) => Number.isFinite(v), "Base salary format is invalid."),

  marriageStatus: MarriageStatus,

  numberOfDependents: z
    .number()
    .int()
    .min(0, "Number of dependents must be 0 or greater.")
    .optional(),

  employeeStatus: EmployeeStatus,

  birthDate: z.string({ required_error: "Birth date is required" }).refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date <= new Date();
    },
    { message: "Birth date cannot be in the future" },
  ),

  gender: Gender,

  roleIds: z.array(z.number().int()).min(1, "Role must not be empty."),

  departmentId: z.number().int({
    message: "Department ID is required.",
  }),
});

export type EmployeeRequest = z.infer<typeof EmployeeRequest>;
