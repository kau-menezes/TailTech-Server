import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";
import DoorPermission from "./DoorPermission.entity";
import BlockRange from "./BlockRange.entity";

@Entity("pet_doors")
export default class PetDoor {
    
    @PrimaryGeneratedColumn("uuid")
    petDoorId?: string;

    @Column({ type: "varchar", length: 30, default: "New Door" })
    nickname?: string;

    @Column()
    userId?: string;

    @ManyToOne(() => User, (u) => u.doors, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @OneToMany(() => DoorPermission, (dp) => dp.petDoor)
    permissions?: DoorPermission[];

    @OneToMany(() => BlockRange, (br) => br.petDoor)
    blockRanges?: BlockRange[];
}