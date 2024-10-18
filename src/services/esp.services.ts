import AppDataSource from "../data-source"
import Pet from "../entities/Pet.entity";
import PetDoor from "../entities/PetDoor.entity"
import AppError from "../errors";
import DoorPermission from "../entities/DoorPermission.entity";
import { sign, verify } from "jsonwebtoken";
import BlockRange from "../entities/BlockRange.entity";

export const registerEsp = async (bearer:string) => {
    
    const [_, token] = bearer.split(" ");
    let userId:string = "";

    verify(token, String(process.env.SECRET_KEY),
        (err:any, decoded:any) => {
            if(err) throw new AppError(err.message, 401);
            userId = decoded.sub;
        }
    )

    const repo = AppDataSource.getRepository(PetDoor);

    const creation = repo.create({ userId });
    const door = await repo.save(creation);

    const doorToken = sign(
        { petDoorId: door.petDoorId, userId }, 
        String(process.env.SECRET_KEY),
        {}
    )
    return { token: doorToken }
}

export const readPetTagService = async (bearer:string, petId:string) => {
    
    const [_, token] = bearer.split(" ");
    let petDoorId:string = "";
    let userId:string = "";
    
    verify(token, String(process.env.SECRET_KEY), 
        async (err:any, decoded:any) => {
            if(err) throw new AppError(err.message, 401);
            petDoorId = decoded.petDoorId;
            userId = decoded.userId;
        }
    );

    const petRepo = AppDataSource.getRepository(Pet);
    const doorRepo = AppDataSource.getRepository(PetDoor);
    
    const door = await doorRepo.findOne({ where: { petDoorId, userId } });
    if(!door) throw new AppError("Door not found.", 404);

    const pet = await petRepo.findOneBy({ petId })
    if(!pet) {
        petRepo.save({ petId, userId })
        throw new AppError("New Pet detected, access app for details.", 401);
    }
    
    const permission = await AppDataSource
        .getRepository(DoorPermission)
        .findOneBy({ petDoorId, petId });
    if(!permission) throw new AppError("That pet cannot go through that door", 401);

    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    const block = await AppDataSource
        .getRepository(BlockRange)
        .createQueryBuilder("br")
        .where(
            "br.startHour < :hour1 OR (br.startHour = :hour2 AND br.startMinute <= :minute)", 
            { hour1: hour, hour2: hour, minute }
        )
        .andWhere(
            "br.endHour > :hour1 OR (br.endHour = :hour2 AND br.endMinute >= :minute)", 
            { hour1: hour, hour2: hour, minute }
        )
        .getExists();
    if(block) throw new AppError("Door is blocked at this time", 401);
}
