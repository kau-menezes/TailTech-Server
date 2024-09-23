import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import User from "./User.entity";
import { boolean } from "zod";

@Entity("pet_doors")
export default class PetDoor {
    
    @PrimaryColumn({ type: "varchar" })
    id?: string;

    @Column({ type: "char", length: 6, select: false })
    code?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    nickname?: string;

    @Column({ type: "boolean", default: false })
    freeAccess?: boolean;

    @ManyToOne(() => User, { nullable: true })
    user?: User;

    @BeforeInsert()
    public getCode() {
        if(this.code) return this.code;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.code = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            this.code += chars[randomIndex];
        }
        return this.code;
    }
}