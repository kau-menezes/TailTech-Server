import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pet from "./Pet.entity";
import { hashSync } from "bcryptjs";
import PetDoor from "./PetDoor.entity";

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "varchar", length: 255 })
    fullname?: string;

    @Column({ type: "varchar", length: 255 })
    email?: string;

    @Column({ type: "varchar", length: 500, select: false })
    password?: string;
    
    @OneToMany(() => Pet, (pet) => pet.user)
    pets?: Pet[];

    @OneToMany(() => PetDoor, (door) => door.user)
    doors?: PetDoor[];


    @BeforeInsert()
    public hashPassword() {
        this.password = hashSync(this.password!);
    }
}