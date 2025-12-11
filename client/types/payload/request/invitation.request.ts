import { z } from "zod";

export const InvitationRequest = z.object({
  username: z
    .string()
    .min(5, "Username is too short. Please enter at least 5 characters")
    .max(50, "Username is too long. Please enter no more than 50 characters")
    .nonempty("Username cannot be blank"),

  email: z
    .string()
    .email("Please provide a valid email address")
    .min(5, "Email is too short. Please enter at least 5 characters")
    .max(100, "Email is too long. Please enter no more than 100 characters")
    .nonempty("Email cannot be blank"),

  roles: z
    .array(
      z
        .string()
        .regex(
          /^ROLE_[A-Z_]+$/,
          "Each role must start with 'ROLE_' and contain only uppercase letters",
        ),
    )
    .min(1, "At least one role must be provided"),
});

export type InvitationRequest = z.infer<typeof InvitationRequest>;
