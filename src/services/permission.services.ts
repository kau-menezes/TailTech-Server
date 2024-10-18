import AppDataSource from "../data-source"
import DoorPermission from "../entities/DoorPermission.entity";
import PetDoor from "../entities/PetDoor.entity";
import AppError from "../errors";
import { IDoorBlockRangeUpdate, IPetPermissionUpdate } from "../schemas/permissions.schemas";


export const getDoorPermissionDetailsService = async (petDoorId:string) => {
    return await AppDataSource.getRepository(DoorPermission).findOne({
        where: { petDoorId },
    })
}

export const updateDoorBlockRangesService = async (petDoorId:string, payload:IDoorBlockRangeUpdate) => {
    const repo = AppDataSource.getRepository(PetDoor);

    const door = await repo.findOne({
        where: { petDoorId },
        relations: { blockRanges: true },
    });
    if(!door) throw new AppError("Door not found", 404);

    return repo.save({ ...door, blockRanges: payload })
}

export const updatePetPermissionsService = async (petId:string, petDoorId:string, payload:IPetPermissionUpdate) => {
    const repo = AppDataSource.getRepository(DoorPermission);
    
    if(payload) {
        await repo.save({ petId, petDoorId });
        return
    }
    await repo.remove({ petId, petDoorId });
}
