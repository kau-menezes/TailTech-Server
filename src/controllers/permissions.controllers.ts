import { Request, Response } from "express";
import { getDoorPermissionDetailsService, updateDoorBlockRangesService, updatePetPermissionsService } from "../services/permission.services";

export const getDoorPermissionDetailsControllerr = async (req:Request, res:Response) => {
    const permissions = await getDoorPermissionDetailsService(req.params.petDoorId);
    return res.status(200).json(permissions);
}

export const updateDoorBlockRangesController = async (req:Request, res:Response) => {
    const permissions = await updateDoorBlockRangesService(req.params.petDoorId, req.body);
    return res.status(200).json(permissions);
}

export const updatePetPermissionsController = async (req:Request, res:Response) => {
    const permissions = await updatePetPermissionsService(req.params.petId, req.params.petDoorId, req.body);
    return res.status(200).json(permissions);
}
