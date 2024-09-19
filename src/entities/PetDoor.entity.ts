import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";

@Entity("pet_doors")
export default class PetDoor {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "varchar", length: 50 })
    nickname?: string;

    @ManyToOne(() => User)
    user?: User; 
}