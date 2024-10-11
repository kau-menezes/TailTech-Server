import { IsNull, Not } from "typeorm";
import AppDataSource from "../data-source";
import Pet from "../entities/Pet.entity";
import AppError from "../errors";
import { IPetUpdate } from "../schemas/pets.schemas";


export const getPetsService = async (userId:string) => {
    return await AppDataSource.getRepository(Pet).find({
        where: { userId, name: Not(IsNull()) }
    });
}

export const getPetToRegisterService = async (userId:string) => {
    const pet = await AppDataSource.getRepository(Pet).findOne({
        where: { userId, name: IsNull() }
    });
    if(!pet) throw new AppError("No pet to register found", 404);
    return pet;
}

export const updatePetService = async (petId:string, userId:string, payload:IPetUpdate, pictureUrl?:string) => {
    const repo = AppDataSource.getRepository(Pet);

    const pet = await repo.findOneBy({ petId, userId });
    if(!pet) throw new AppError("Pet not found", 404);

    if(pictureUrl) pet.pictureUrl = pictureUrl;
    await repo.save({ ...pet, ...payload });
}

export const deletePetService = async (petId:string, userId:string) => {
    
    const repo = AppDataSource.getRepository(Pet);

    const pet = await repo.findOneBy({ petId, userId });
    if(!pet) throw new AppError("Pet not found", 404);

    await repo.remove(pet);
}