import { Repository } from "typeorm";
import { TUserCreation } from "../types/user.types";
import User from "../entities/User.entity";
import AppDataSource from "../data-source";
import AppError from "../errors";

export const createUserService = async (payload:TUserCreation): Promise<User> => {
    const repo:Repository<User> = AppDataSource.getRepository(User);
    const user = repo.create(payload);
    return await repo.save(user)
}

export const getUserService = async (id:string): Promise<User> => {
    const repo:Repository<User> = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { id } })
    if(!user) throw new AppError("User not found", 404);
    return user;
}
