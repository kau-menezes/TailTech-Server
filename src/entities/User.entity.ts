import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pet from "./Pet.entity";
import { hashSync } from "bcryptjs";
import PetDoor from "./PetDoor.entity";
import Notification from "./Notification.entity";

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    userId?: string;

    @Column({ type: "varchar", length: 25 })
    username?: string;

    @Column({ type: "varchar", length: 255 })
    email?: string;

    @Column({ type: "varchar", length: 500, select: false })
    password?: string;

    @Column({ type: 'date' })
    birthdate?: string;
    
    @OneToMany(() => Pet, (pet) => pet.user)
    pets?: Pet[];

    @OneToMany(() => PetDoor, (door) => door.user)
    doors?: PetDoor[];

    @OneToMany(() => Notification, (n) => n.user)
    notifications?: Notification[];

    @BeforeInsert()
    @BeforeUpdate()
    public hashPassword() {
        this.password = hashSync(this.password!);
    }
}