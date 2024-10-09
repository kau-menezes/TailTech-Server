import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";

@Entity("notifications")
export default class Notification {

    @PrimaryGeneratedColumn("uuid")
    notificationId?: string;

    @Column({ type: "text" })
    content?: string;

    @Column({ type: "boolean", default: false })
    read?: boolean;

    @Column()
    userId?: string;

    @ManyToOne(() => User, (u) => u.notifications, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User;
}