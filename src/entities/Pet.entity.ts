import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";
import DoorPermission from "./DoorPermission.entity";

@Entity("pets")
export default class Pet {

    @PrimaryGeneratedColumn("uuid")
    petId?: string;

    @Column({ type: "varchar", length: 255 })
    name?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    pictureUrl?: string;

    @Column({ type: "varchar", length: 255 })
    userId?: string;

    @ManyToOne(() => User, (u) => u.pets, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @OneToMany(() => DoorPermission, (dp) => dp.pet, { cascade: true, onDelete: "CASCADE" })
    permissions?: DoorPermission[];
}