import AppDataSource from "../data-source";
import PetDoor from "../entities/PetDoor.entity";
import AppError from "../errors";
import { IPetDoorUpdate } from "../schemas/doors.schemas";


export const updateDoorService = async (userId:string, petDoorId:string, payload:IPetDoorUpdate) => {
    const repo = AppDataSource.getRepository(PetDoor);

    const door = await repo.findOneBy({ userId, petDoorId });
    if(!door) throw new AppError("Door not found", 404);
    
    return await repo.save({ ...door, ...payload });
}

export const getDoorsService = async (userId:string) => {
    return await AppDataSource.getRepository(PetDoor).find({
        where: { userId }
    });
}