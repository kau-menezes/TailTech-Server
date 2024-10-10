import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";
import DoorPermission from "./DoorPermission.entity";

@Entity("pet_doors")
export default class PetDoor {
    
    @PrimaryGeneratedColumn("uuid")
    petDoorId?: string;

    @Column({ type: "varchar", length: 30, default: "New Door" })
    nickname?: string;

    @Column({ type: "boolean", default: false })
    freeAccess?: boolean;

    @Column({ type: "varchar", length: 255 })
    userId?: string;

    @ManyToOne(() => User, (u) => u.doors, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @OneToMany(() => DoorPermission, (dp) => dp.petDoor, { cascade: true, onDelete: "CASCADE" })
    permissions?: DoorPermission[];
}