import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pet from "./Pet.entity";
import PetDoor from "./PetDoor.entity";
import PermissionRange from "./PermissionRange.entity";

@Entity("door_permissions")
export default class DoorPermission {

    @PrimaryGeneratedColumn("uuid")
    doorPermissionId?: string;

    @Column()
    petId?: string;

    @ManyToOne(() => Pet, (p) => p.permissions, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "petId" })
    pet?: Pet;

    @Column()
    petDoorId?: string;

    @ManyToOne(() => PetDoor, (pd) => pd.permissions, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "petDoorId" })
    petDoor?: PetDoor;

    @OneToMany(() => PermissionRange, (pr) => pr.doorPermission, { cascade: true, onDelete: "CASCADE" })
    ranges?: PermissionRange[];
}