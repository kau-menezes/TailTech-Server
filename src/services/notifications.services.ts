import AppDataSource from "../data-source";
import Notification from "../entities/Notification.entity";

export const getNotificationsService = async (userId:string, read?:boolean) => {
    return await AppDataSource.getRepository(Notification).findBy({userId, read });    
}

export const deleteNoticationService = async (userId:string, notificationId:string) => {
    await AppDataSource.getRepository(Notification).remove({ userId, notificationId });
}
