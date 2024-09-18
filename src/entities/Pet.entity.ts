import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";

@Entity("pets")
export default class Pet {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "varchar", length: 255 })
    name?: string;

    @ManyToOne(() => User, { cascade: true })
    user?: User;
}