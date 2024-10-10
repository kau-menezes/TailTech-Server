import { compareSync } from "bcryptjs";
import AppDataSource from "../data-source";
import User from "../entities/User.entity";
import AppError from "../errors";
import { sign } from "jsonwebtoken";

interface ILoginPayload {
    email: string;
    password: string;
}

export const loginService = async ({ email, password }:ILoginPayload) => {

    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ 
        where: { email }, 
        relations: { pets: true },
        select: { userId: true, password: true, email: true }
    });
    if(!user) throw new AppError("Email not registered", 401);

    if(compareSync(password, user.password!))
        throw new AppError("Password does not match", 401)

    const token = sign( {},
        String(process.env.SECRET_KEY),
        { subject: user.userId }
    )

    return { token, user }
}