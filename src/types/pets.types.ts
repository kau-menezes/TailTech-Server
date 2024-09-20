import Pet from "../entities/Pet.entity";

export type TPetCreation = Pick<Pet, "name" | "id">;

export type TPetUpdate = Omit<TPetCreation, "id">;
