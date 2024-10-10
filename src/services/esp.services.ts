import AppDataSource from "../data-source"
import Pet from "../entities/Pet.entity";
import PetDoor from "../entities/PetDoor.entity"
import AppError from "../errors";
import DoorPermission from "../entities/DoorPermission.entity";
import { sign, verify } from "jsonwebtoken";

export const registerEsp = async (userId:string) => {
    const repo = AppDataSource.getRepository(PetDoor);

    const creation = repo.create({ userId });
    const door = await repo.save(creation);

    return sign(
        { petDoorId: door.petDoorId, userId }, 
        String(process.env.SECRET_KEY),
        {}
    )
}

export const readPetTagService = async (token:string, hash:string) => {
    verify(token, String(process.env.SECRET_KEY), 
        async (err:any, decoded:any) => {
            if(err) throw new AppError(err.message, 401);

            const { petDoorId, userId } = decoded;

            const petRepo = AppDataSource.getRepository(Pet);
            const doorRepo = AppDataSource.getRepository(PetDoor);
            
            const door = await doorRepo.findOne({ where: { petDoorId, userId } });
        
            if(!door) throw new AppError("Door not found.", 404);
            if(door.freeAccess) return;
        
            const pet = await petRepo.findOneBy({ petId: hash })
            if(!pet) {
                petRepo.save({ petId: hash, userId })
                throw new AppError("New Pet created, access app for details.", 401);
            }
            
            const permissionRepo = AppDataSource.getRepository(DoorPermission);
            
            const permission = await permissionRepo.findOne({
                where: { pet: pet, petDoorId },
                relations: { ranges: true }
            });
            if(!permission) throw new AppError("Pet does not have permission", 403);
            if(permission.ranges!.length < 1) return;
        
            const hours = new Date().getHours();
            const minutes = new Date().getMinutes();
            
            for (let i = 0; i < permission.ranges!.length; i++) {
                const range = permission.ranges![i];
                
                if(
                    (   
                        range.startHour! < hours ||
                        (range.startHour! == hours && range.startMinute! <= minutes)
                    ) &&
                    (   
                        range.endHour! > hours ||
                        (range.endHour! == hours && range.endMinute! >= minutes)
                    )
                ) return;
            }
            throw new AppError("Invalid access", 403);
        }
    );
}
