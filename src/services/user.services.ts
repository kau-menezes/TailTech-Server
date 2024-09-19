import { Repository } from "typeorm";
import { TUserCreation } from "../types/user.types";
import User from "../entities/User.entity";
import AppDataSource from "../data-source";
import { hashSync } from "bcryptjs";

export const createUserService = async (payload:TUserCreation): Promise<User> => {
    const repo:Repository<User> = AppDataSource.getRepository(User);
    const user = repo.create(payload);
    user.password = hashSync(user.password!);
    return await repo.save(user)
}



