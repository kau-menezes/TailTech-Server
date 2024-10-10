import { Request, Response } from "express";
import { deleteNoticationService, getNotificationsService } from "../services/notifications.services";

export const getNotificationsController = async (req:Request, res:Response) => {
    const service = await getNotificationsService(res.locals.userId, req.query.read == "all");
    return res.status(200).json(service);
}

export const deleteNoticationController = async (req:Request, res:Response) => {
    await deleteNoticationService(res.locals.userId, req.params.notificationId);
    return res.status(204).send();
}
