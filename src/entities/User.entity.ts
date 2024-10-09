import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pet from "./Pet.entity";
import { hashSync } from "bcryptjs";
import PetDoor from "./PetDoor.entity";
import Notification from "./Notification.entity";

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    userId?: string;

    @Column({ type: "varchar", length: 255 })
    username?: string;

    @Column({ type: "varchar", length: 255 })
    email?: string;

    @Column({ type: "varchar", length: 500, select: false })
    password?: string;

    @Column({ type: 'date' })
    birthdate?: string;
    
    @OneToMany(() => Pet, (pet) => pet.user, { cascade: true, onDelete: "CASCADE" })
    pets?: Pet[];

    @OneToMany(() => PetDoor, (door) => door.user, { cascade: true, onDelete: "CASCADE" })
    doors?: PetDoor[];

    @OneToMany(() => Notification, (n) => n.user, { cascade: true, onDelete: "CASCADE" })
    notifications?: Notification[];

    @BeforeInsert()
    @BeforeUpdate()
    public hashPassword() {
        this.password = hashSync(this.password!);
    }
}