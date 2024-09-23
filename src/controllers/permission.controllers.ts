import { Request, Response } from "express";
import { toggleFreeAccessService, togglePermissionService } from "../services/permission.services";

export const togglePermissionController = async (req:Request, res:Response) => {
    await togglePermissionService(req.params.petId, req.params.doorId);
    return res.status(204).send();
}

export const toggleFreeAccessController = async (req:Request, res:Response) => {
    await toggleFreeAccessService(req.params.doorId);
    return res.status(204).send();
}
