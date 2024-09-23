import AppDataSource from "../data-source"
import Pet from "../entities/Pet.entity";
import PetDoor from "../entities/PetDoor.entity"
import AppError from "../errors";
import { createPetService } from "./pets.services";
import DoorPermission from "../entities/DoorPermission.entity";
import PermissionRange from "../entities/PermissionRange.entity";

export const ensureEspRegister = async (id:string) => {

    const repo = AppDataSource.getRepository(PetDoor);

    const door = await repo.findOneBy({ id: id });
    if(door) return;

    const newDoor = repo.create({ id: id });
    await repo.save(newDoor);
}

export const readPetTagService = async (id:string, hash:string): Promise<void> => {

    const petRepo = AppDataSource.getRepository(Pet);
    const doorRepo = AppDataSource.getRepository(PetDoor);
    
    const door = await doorRepo.findOne({ where: { id }, relations: { user: true } });
    const pet = await petRepo.findOneBy({ id: hash })

    if(!door) throw new AppError("Door not found.", 404);
    if(!pet) {
        if(!door.user) throw new AppError("Door doesn't have a owner yet.");
        
        const numberOfPets = await petRepo.countBy({ user: door!.user })
        await createPetService(door.user!.id!, { name: `Pet ${numberOfPets + 1}`, id: hash })
        
        throw new AppError("New Pet created, access app for details.", 401);
    }
    
    const permissionRepo = AppDataSource.getRepository(DoorPermission);
    
    const permission = await permissionRepo.findOneBy({ pet: pet, petDoor: door });
    if(!permission) throw new AppError("Pet does not have permission", 403);
    
    const rangeRepo = AppDataSource.getRepository(PermissionRange);
    
    const ranges = await rangeRepo.findBy({ doorPermission: permission });
    if(ranges.length < 1) return;

    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        
        if(
            (   
                range.begginingHour! < hours ||
                (range.begginingHour! == hours && range.begginingMinute! <= minutes)
            ) &&
            (   
                range.finishHour! > hours ||
                (range.finishHour! == hours && range.finishMinute! >= minutes)
            )
        ) return;
    }
    throw new AppError("Invalid access", 403);
}
