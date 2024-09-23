import AppDataSource from "../data-source";
import PetDoor from "../entities/PetDoor.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import { TDoorUpdate } from "../types/door.types";

export const redeemDoorService = async (code:string, userId:string) => {
    
    const doorRepo = AppDataSource.getRepository(PetDoor);
    const userRepo = AppDataSource.getRepository(User);

    const door = await doorRepo.findOneBy({ code });
    if(!door) throw new AppError("Invalid code", 404);

    const user = await userRepo.findOneBy({ id: userId });
    if(!user) throw new AppError("User not found", 404);

    door.user = user;
    return await doorRepo.save(door);
}

export const updateDoorService = async (id:string, payload:TDoorUpdate) => {

    const repo = AppDataSource.getRepository(PetDoor);

    if(!repo.existsBy({ id })) 
        throw new AppError("Door not found", 404);
    
    await repo.update({ id }, payload);
}

export const getDoorsService = async (userId:string): Promise<PetDoor[]> => {

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ 
        where: { id: userId },
        relations: { doors: true } 
    })
    if(!user) throw new AppError("User not found");

    return user.doors || [];
}