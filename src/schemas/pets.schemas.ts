import { z } from "zod";


export const updatePetSchema = z.object({
    name: z.string().min(3).max(30).optional(),

}).strict();

export type IPetUpdate = z.infer<typeof updatePetSchema>;

