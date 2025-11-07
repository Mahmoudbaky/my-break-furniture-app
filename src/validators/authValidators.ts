import z from "zod";

export const registerValidationSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  phone: z.string().optional(),
});
