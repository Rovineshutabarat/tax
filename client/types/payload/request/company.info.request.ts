import { z } from "zod/v3";

export const CompanyInfoRequest = z.object({
  name: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name cannot exceed 100 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .max(100, "Email cannot exceed 100 characters"),

  phoneNumber: z
    .string()
    .regex(
      /^\+?[0-9]{8,20}$/,
      "Phone number must contain 8–20 digits and may start with +",
    ),

  establishedAt: z
    .string({ required_error: "Established date is required" })
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && date <= new Date();
      },
      { message: "Established date cannot be in the future" },
    ),
});

export type CompanyInfoRequest = z.infer<typeof CompanyInfoRequest>;
