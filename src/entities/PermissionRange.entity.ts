import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import DoorPermission from "./DoorPermission.entity";

@Entity("permission_ranges")
export default class PermissionRange {

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
    doorPermissionId?: string;

    @ManyToOne(() => DoorPermission, (dp) => dp.ranges, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "doorPermissionId" })
    doorPermission?: DoorPermission;
}