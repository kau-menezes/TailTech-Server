import AppDataSource from "../data-source"
import DoorPermission from "../entities/DoorPermission.entity";
import BlockRange from "../entities/BlockRange.entity";
import Pet from "../entities/Pet.entity";
import PetDoor from "../entities/PetDoor.entity";
import AppError from "../errors";
import { IPetPermissionUpdate } from "../schemas/permissions.schemas";


export const getPetPermissionService = async (petId:string, petDoorId:string) => {
    return await AppDataSource.getRepository(DoorPermission).findOne({
        where: { petId, petDoorId },
        relations: { ranges: true }
    })
}

export const updatePetPermissionsService = async (petId:string, petDoorId:string, payload:IPetPermissionUpdate) => {

    const permissionRepo = AppDataSource.getRepository(DoorPermission);
    const petRepo = AppDataSource.getRepository(Pet);
    const doorRepo = AppDataSource.getRepository(PetDoor);
    const rangeRepo = AppDataSource.getRepository(BlockRange);

    const pet = await petRepo.findOneBy({ petId });
    if(!pet) throw new AppError("Pet not found", 404);
    
    const petDoor = await doorRepo.findOneBy({ petDoorId });
    if(!petDoor) throw new AppError("Door not found", 404);

    let permission = await permissionRepo.findOne({
        where: { petId, petDoorId },
        relations: { ranges: true }
    });

    if(!payload.permission && permission) {
        await permissionRepo.remove(permission);
        return;
    }

    if(!permission) {
        permission = permissionRepo.create({ petId, petDoorId });
    }
    permission.ranges = payload.ranges?.map(r => rangeRepo.create({ 
        ...r, petDoorId: permission.doorPermissionId }));

    return await permissionRepo.save(permission);
}
