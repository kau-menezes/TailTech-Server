import { z } from "zod";


export const createUserSchema = z.object({
    username: z.string().min(3).max(25),
    email: z.string().email(),
    password: z.string().min(8),
    birthdate: z.string().date(),
}).strict();

export type IUserCreation = z.infer<typeof createUserSchema>;
