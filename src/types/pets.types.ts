import Pet from "../entities/Pet.entity";

export type TPetCreation = Omit<Pet, "id">;