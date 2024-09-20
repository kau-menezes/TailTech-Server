import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import User from "./User.entity";
import { v4 as uuid } from "uuid";

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

    @BeforeInsert()
    ensureId() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}