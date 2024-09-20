import AppDataSource from "../data-source";
import Pet from "../entities/Pet.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import { TPetCreation, TPetUpdate } from "../types/pets.types";

export const createPetService = async (userId:string, payload:TPetCreation): Promise<Pet> => {

    const petRepo = AppDataSource.getRepository(Pet);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: userId } });
    if(!user) throw new AppError("User not found", 404);

    const pet = petRepo.create(payload);
    pet.user = user;

    return await petRepo.save(pet);
}

export const getPetService = async (id:string): Promise<Pet> => {

    const repo = AppDataSource.getRepository(Pet);

    const pet = await repo.findOneBy({ id });
    if(!pet) throw new AppError("Pet not found", 404);

    return pet;
}

export const updatePetService = async (id:string, payload:TPetUpdate): Promise<void> => {

    const repo = AppDataSource.getRepository(Pet);

    if(!await repo.existsBy({ id }))
        throw new AppError("Pet not found", 404);

    await repo.update({ id }, payload);
}

export const deletePetService = async (id:string): Promise<void> => {
    
    const repo = AppDataSource.getRepository(Pet);

    if(!await repo.existsBy({ id }))
        throw new AppError("Pet not found", 404);

    await repo.delete({ id });
}