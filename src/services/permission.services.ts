import AppDataSource from "../data-source"
import DoorPermission from "../entities/DoorPermission.entity";
import PermissionRange from "../entities/PermissionRange.entity";
import Pet from "../entities/Pet.entity";
import PetDoor from "../entities/PetDoor.entity";
import AppError from "../errors";
import { TPermissionRangeCreation } from "../types/permission.types";

export const togglePermissionService = async (petId:string, petDoorId:string) => {

    const permissionRepo = AppDataSource.getRepository(DoorPermission);
    const petRepo = AppDataSource.getRepository(Pet);
    const doorRepo = AppDataSource.getRepository(PetDoor);

    const pet = await petRepo.findOneBy({ id: petId });
    if(!pet) throw new AppError("Pet not found", 404);
    
    const petDoor = await doorRepo.findOneBy({ petDoorId: petDoorId });
    if(!petDoor) throw new AppError("Door not found", 404);

    if(await permissionRepo.exists({ where: { pet, petDoor } })) 
        await permissionRepo.delete({ pet, petDoor });
    else 
        await permissionRepo.save({ pet, petDoor })
}

export const toggleFreeAccessService = async (id:string) => {

    const repo = AppDataSource.getRepository(PetDoor);

    const door = await repo.findOneBy({ petDoorId: id });
    if(!door) throw new AppError("Door not found", 404);
    
    door.freeAccess = !door.freeAccess;
    await repo.save(door);
}

export const getPetPermissions = async (petId:string) => {
    return await AppDataSource
        .getRepository(Pet)
        .findOne({
            where: { id: petId },
            relations: {  }
        })
}

export const createPermissionRangeService = async (
    petId:string, petDoorId:string, payload:TPermissionRangeCreation
) => {
    const repo = AppDataSource.getRepository(PermissionRange);
    
    const doorPermission = await AppDataSource
        .getRepository(DoorPermission)
        .createQueryBuilder("dp")
        .where("dp.petId = :petId", { petId })
        .andWhere("dp.petDoorId = :petDoorId", { petDoorId })
        .getOne();
    if(!doorPermission) throw new AppError("Create a door permission first");

    const range = repo.create({ ...payload, doorPermission });
    return repo.save(range);
}

export const deletePermissionRangeService = async (id:string) => {
    const repo = AppDataSource.getRepository(PermissionRange);
    const range = await repo.findOneBy({ id });
    if(!range) throw new AppError("Range not found", 404);
    await repo.delete(range);
}
