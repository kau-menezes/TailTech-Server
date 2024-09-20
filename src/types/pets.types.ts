import Pet from "../entities/Pet.entity";

export type TPetCreation = Pet;

export type TPetUpdate = Omit<TPetCreation, "id">;
