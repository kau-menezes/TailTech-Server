import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";

@Entity("pets")
export default class Pet {

    @PrimaryColumn({ type: "varchar", length: 255 })
    id?: string;

    @Column({ type: "varchar", length: 255 })
    name?: string;

    @Column({ type: "varchar", length: 255 })
    picture?: string;

    @ManyToOne(() => User, { cascade: true })
    user?: User;
}