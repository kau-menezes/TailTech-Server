import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import DoorPermission from "./DoorPermission.entity";

@Entity("pets")
export default class Pet {

    @PrimaryColumn()
    petId?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    name?: string | null;

    @Column({ type: "varchar", length: 255, nullable: true })
    pictureUrl?: string | null;

    @Column()
    userId?: string;

    @ManyToOne(() => User, (u) => u.pets, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;

    @OneToMany(() => DoorPermission, (dp) => dp.pet)
    permissions?: DoorPermission[];
}