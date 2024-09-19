import { TPetDoor } from "./petDoor.types";
import { TPet } from "./pets.types";

type TPermissionRange = {
    id: string;
    beggining: string;
    finish: string;
}

export type TPermission = {
    id: string;
    petDoor: TPetDoor;
    pet: TPet;
    ranges?: TPermissionRange[] | null;
}

