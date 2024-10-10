import { z } from "zod";

export const updatePetDoorSchema = z.object({
    nickname: z.string().min(3).max(30).optional(),
    freeAccess: z.boolean().optional()
}).strict();

export type IPetDoorUpdate = z.infer<typeof updatePetDoorSchema>;