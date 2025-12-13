import { z } from "zod/v3";

export const Gender = z.enum(["MAN", "WOMAN"], {
  required_error: "Gender is required",
});

export type Gender = z.infer<typeof Gender>;
