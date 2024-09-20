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

export const updateDoorService = async (mac:string, payload:TDoorUpdate) => {

    const repo = AppDataSource.getRepository(PetDoor);

    if(!repo.existsBy({ mac })) 
        throw new AppError("Door not found", 404);
    
    await repo.update({ mac }, payload);
}