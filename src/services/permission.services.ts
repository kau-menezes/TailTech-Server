import { IsNull, Not } from "typeorm";
import AppDataSource from "../data-source"
import BlockRange from "../entities/BlockRange.entity";
import DoorPermission from "../entities/DoorPermission.entity";
import Pet from "../entities/Pet.entity";
import PetDoor from "../entities/PetDoor.entity";
import AppError from "../errors";
import { IDoorBlockRangeCreation, IPetPermissionUpdate } from "../schemas/permissions.schemas";


export const getDoorPermissionDetailsService = async (petDoorId:string, userId:string) => {
    const foundDoor = await AppDataSource.getRepository(PetDoor).existsBy({ petDoorId })
    if(!foundDoor) throw new AppError("Door not found", 404)

    const blockRanges = await AppDataSource.getRepository(BlockRange).find({
        select: { startHour: true, startMinute: true, endHour: true, endMinute: true, blockRangeId: true },
        where: { petDoorId },
    });
    const pets = await AppDataSource.getRepository(Pet).find({
        where: { userId, name: Not(IsNull()) },
        relations: { permissions: true }
    });

    const petsWithPermissionField = pets.map(pet => ({
        petId: pet.petId,
        name: pet.name,
        hasPermission: Number(pet.permissions?.findIndex(
            permission => permission.petDoorId == petDoorId
        )) >= 0,
    }))

    return { blockRanges, pets: petsWithPermissionField }
}

export const createDoorBlockRangesService = async (petDoorId:string, payload:IDoorBlockRangeCreation) => {
    const doorRepo = AppDataSource.getRepository(PetDoor);

    const found = await doorRepo.existsBy({ petDoorId });
    if(!found) throw new AppError("Door not found", 404);

    return await AppDataSource
        .getRepository(BlockRange)
        .save({ ...payload, petDoorId })
}

export const deleteDoorBlockRangeService = async (blockRangeId:string) => {
    await AppDataSource.getRepository(BlockRange).delete({ blockRangeId });
}

export const updatePetPermissionsService = async (petId:string, petDoorId:string, payload:IPetPermissionUpdate) => {
    const repo = AppDataSource.getRepository(DoorPermission);
    
    if(payload.permission) {
        await repo.save({ petId, petDoorId });
        return
    }
    const permission = await repo.findOneBy({ petId, petDoorId });
    if(!permission) return;
    await repo.remove(permission);
}
