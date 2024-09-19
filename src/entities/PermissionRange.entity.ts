import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import DoorPermission from "./DoorPermission.entity";

@Entity("permission_ranges")
export default class PermissionRange {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "int" })
    begginingHour?: number;

    @Column({ type: "int" })
    begginingMinute?: number;

    @Column({ type: "int" })
    finishHour?: number;

    @Column({ type: "int" })
    finishMinute?: number;

    @ManyToOne(() => DoorPermission)
    doorPermission?: DoorPermission
}