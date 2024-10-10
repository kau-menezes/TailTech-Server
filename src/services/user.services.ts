import User from "../entities/User.entity";
import AppDataSource from "../data-source";
import AppError from "../errors";
import { IUserCreation } from "../schemas/users.schemas";

export const createUserService = async (payload:IUserCreation) => {
    const repo = AppDataSource.getRepository(User);

    const user = repo.create(payload);
    await repo.save(user);
    
    user.password = undefined;
    return user;
}

export const getUserService = async (userId:string) => {
    const repo = AppDataSource.getRepository(User);
    
    const user = await repo.findOneBy({ userId });
    if(!user) throw new AppError("User not found", 404);
    
    return user;
}
