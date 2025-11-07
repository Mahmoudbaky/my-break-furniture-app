import z from "zod";

export const createCategoryValidationSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(500).optional(),
});
