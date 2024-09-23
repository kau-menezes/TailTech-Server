import AppDataSource from "../data-source"
import DoorPermission from "../entities/DoorPermission.entity";
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
    
    const petDoor = await doorRepo.findOneBy({ id: petDoorId });
    if(!petDoor) throw new AppError("Door not found", 404);

    if(await permissionRepo.exists({ where: { pet, petDoor } })) 
        await permissionRepo.delete({ pet, petDoor });
    else 
        await permissionRepo.save({ pet, petDoor })
}

export const toggleFreeAccessService = async (id:string) => {

    const repo = AppDataSource.getRepository(PetDoor);

    const door = await repo.findOneBy({ id });
    if(!door) throw new AppError("Door not found", 404);
    
    door.freeAccess = !door.freeAccess;
    await repo.save(door);
}

export const createPermissionRangeService = async (
    petId:string, petDoorId:string, payload:TPermissionRangeCreation
) => {

}
