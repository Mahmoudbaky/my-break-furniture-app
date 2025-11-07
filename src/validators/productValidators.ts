import z from "zod";

export const createProductValidationSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(500).optional(),
  itemFeatures: z.array(z.string().min(2).max(100)).optional(),
  price: z.number().min(0),
  category: z.string().min(2).max(100),
  images: z.array(z.string().min(2).max(300)).optional(),
  banner: z.string().min(2).max(500).or(z.literal("")).optional(),
  isActive: z.boolean().optional(),
});
