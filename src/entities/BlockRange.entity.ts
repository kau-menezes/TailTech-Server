import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import PetDoor from "./PetDoor.entity";

@Entity("block_ranges")
export default class BlockRange {

    @PrimaryGeneratedColumn("uuid")
    permissionRangeId?: string;

    @Column({ type: "smallint" })
    startHour?: number;

    @Column({ type: "smallint" })
    startMinute?: number;

    @Column({ type: "smallint" })
    endHour?: number;

    @Column({ type: "smallint" })
    endMinute?: number;

    @Column()
    petDoorId?: string;

    @ManyToOne(() => PetDoor, (pd) => pd.blockRanges)
    @JoinColumn({ name: "petDoorId" })
    petDoor?: PetDoor;
}