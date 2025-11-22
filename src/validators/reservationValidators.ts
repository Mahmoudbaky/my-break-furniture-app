import z from "zod";

export const reservationStatusUpdateSchema = z.object({
  status: z.enum(["waiting", "confirmed", "completed", "cancelled"]),
});
