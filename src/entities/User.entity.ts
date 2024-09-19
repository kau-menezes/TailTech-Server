import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pet from "./Pet.entity";

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "varchar", length: 255 })
    fullname?: string;

    @Column({ type: "varchar", length: 255 })
    email?: string;

    @Column({ type: "varchar", length: 500 })
    password?: string;
    
    @OneToMany(() => Pet, (pet) => pet.user)
    @JoinColumn()
    pets?: Pet[];
}