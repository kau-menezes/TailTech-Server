import { Request, Response } from "express";
import { getDoorsService, redeemDoorService, updateDoorService } from "../services/doors.services";

export const redeemDoorController = async (req:Request, res:Response) => {
    const service = await redeemDoorService(req.params.code, res.locals.userId);
    return res.status(200).json(service);
}

export const updateDoorController = async (req:Request, res:Response) => {
    await updateDoorService(req.params.mac, req.body);
    return res.status(204).send();
}

export const getDoorController = async (_req:Request, res:Response) => {
    const service = await getDoorsService(res.locals.userId);
    return res.status(200).json(service);
}
