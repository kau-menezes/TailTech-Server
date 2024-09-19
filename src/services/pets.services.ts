import AppDataSource from "../data-source";
import Pet from "../entities/Pet.entity";
import User from "../entities/User.entity";
import AppError from "../errors";
import { TPetCreation } from "../types/pets.types";

export const createPetService = async (userId:string, payload:TPetCreation): Promise<Pet> => {

    const petRepo = AppDataSource.getRepository(Pet);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: userId } });
    if(!user) throw new AppError("User not found", 404);

    const pet = petRepo.create(payload);
    pet.user = user;

    return await petRepo.save(pet);
}