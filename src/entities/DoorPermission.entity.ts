import { Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import Pet from "./Pet.entity";
import PetDoor from "./PetDoor.entity";

@Entity("door_permissions")
export default class DoorPermission {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @ManyToOne(() => Pet)
    pet?: Pet;

    @ManyToOne(() => PetDoor)
    petDoor?: PetDoor;
}