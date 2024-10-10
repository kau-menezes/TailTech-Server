import { Request, Response } from "express";
import { getDoorsService, updateDoorService } from "../services/doors.services";


export const updateDoorController = async (req:Request, res:Response) => {
    const door = await updateDoorService(res.locals.userId, req.params.petDoorId, req.body);
    return res.status(200).json(door);
}

export const getDoorsController = async (_req:Request, res:Response) => {
    const doors = await getDoorsService(res.locals.userId);
    return res.status(200).json(doors);
}
