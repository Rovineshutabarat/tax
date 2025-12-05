import { z } from "zod/v3";

export const Address = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z
    .string()
    .regex(/^[0-9]{5}$/, "Postal code must be 5 digits")
    .optional(),
});

export type Address = z.infer<typeof Address>;
