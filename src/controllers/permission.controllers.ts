import { Request, Response } from "express";
import { createPermissionRangeService, deletePermissionRangeService, toggleFreeAccessService, togglePermissionService } from "../services/permission.services";

export const togglePermissionController = async (req:Request, res:Response) => {
    await togglePermissionService(req.params.petId, req.params.doorId);
    return res.status(204).send();
}

export const toggleFreeAccessController = async (req:Request, res:Response) => {
    await toggleFreeAccessService(req.params.doorId);
    return res.status(204).send();
}

export const createPermissionRangeController = async (req:Request, res:Response) => {
    const service = await createPermissionRangeService(req.params.petId, req.params.doorId, req.body);
    return res.status(201).json(service);
}

export const deletePermissionRangeController = async (req:Request, res:Response) => {
    await deletePermissionRangeService(req.params.rangeId);
    return res.status(204).send();
}
