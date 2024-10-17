import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Pet from "./Pet.entity";
import PetDoor from "./PetDoor.entity";

@Entity("door_permissions")
export default class DoorPermission {

    @PrimaryColumn()
    petId?: string;

    @ManyToOne(() => Pet, (p) => p.permissions, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "petId" })
    pet?: Pet;

    @PrimaryColumn()
    petDoorId?: string;

    @ManyToOne(() => PetDoor, (pd) => pd.permissions, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "petDoorId" })
    petDoor?: PetDoor;
}