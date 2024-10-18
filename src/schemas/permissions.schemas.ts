import { z } from "zod";


export const updatePetPermissionSchema = z.object({
    permission: z.boolean(),
}).strict();

export type IPetPermissionUpdate = z.infer<typeof updatePetPermissionSchema>;


export const updateDoorBlockRangesSchema = z.array(z.object({
    startHour: z.number().int().gte(0).lte(23),
    endHour: z.number().int().gte(0).lte(23),
    startMinute: z.number().int().gte(0).lte(59),
    endMinute: z.number().int().gte(0).lte(59),
}))

export type IDoorBlockRangeUpdate = z.infer<typeof updateDoorBlockRangesSchema>;