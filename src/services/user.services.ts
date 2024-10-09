import { TUserCreation } from "../types/user.types";
import User from "../entities/User.entity";
import AppDataSource from "../data-source";
import AppError from "../errors";

export const createUserService = async (payload:TUserCreation): Promise<User> => {
    const repo = AppDataSource.getRepository(User);
    const user = repo.create(payload);
    await repo.save(user)
    user.password = undefined;
    return user;
}

export const getUserService = async (id:string): Promise<User> => {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({ where: { userId: id }, relations: { pets: true } })
    if(!user) throw new AppError("User not found", 404);
    return user;
}
