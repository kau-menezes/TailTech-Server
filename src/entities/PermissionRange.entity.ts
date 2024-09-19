import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import DoorPermission from "./DoorPermission.entity";

@Entity("permission_ranges")
export default class PermissionRange {

    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({ type: "timestamp" })
    beggining?: Timestamp

    @Column({ type: "timestamp" })
    finish?: Timestamp

    @ManyToOne(() => DoorPermission)
    doorPermission?: DoorPermission
}