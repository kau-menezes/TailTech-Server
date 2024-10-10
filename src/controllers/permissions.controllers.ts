import { Request, Response } from "express";
import { getPetPermissionService, updatePetPermissionsService } from "../services/permission.services";

export const getPetPermissionsControllerr = async (req:Request, res:Response) => {
    const permissions = await getPetPermissionService(req.params.petId, req.params.petDoorId);
    return res.status(200).json(permissions);
}

export const updatePetPermissionsControllerr = async (req:Request, res:Response) => {
    const permissions = await updatePetPermissionsService(req.params.petId, req.params.petDoorId, req.body);
    return res.status(200).json(permissions);
}
