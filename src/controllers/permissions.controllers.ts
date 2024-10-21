import { Request, Response } from "express";
import { getDoorPermissionDetailsService, createDoorBlockRangesService, updatePetPermissionsService, deleteDoorBlockRangeService } from "../services/permission.services";

export const getDoorPermissionDetailsControllerr = async (req:Request, res:Response) => {
    const permissions = await getDoorPermissionDetailsService(req.params.petDoorId, res.locals.userId);
    return res.status(200).json(permissions);
}

export const createDoorBlockRangeController = async (req:Request, res:Response) => {
    const block = await createDoorBlockRangesService(req.params.petDoorId, req.body);
    return res.status(201).json(block);
}

export const deleteDoorBlockRangeController = async (req:Request, res:Response) => {
    await deleteDoorBlockRangeService(req.params.blockRangeId);
    return res.status(204).send();
}

export const updatePetPermissionsController = async (req:Request, res:Response) => {
    const permissions = await updatePetPermissionsService(req.params.petId, req.params.petDoorId, req.body);
    return res.status(200).json(permissions);
}
