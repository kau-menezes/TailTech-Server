import PetDoor from "../entities/PetDoor.entity";

export type TDoorUpdate = Required<Pick<PetDoor, "nickname">>;
