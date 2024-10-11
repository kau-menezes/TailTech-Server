import { Request, Response } from "express";
import { deletePetService, getPetsService, getPetToRegisterService, updatePetService } from "../services/pets.services";


export const getPetsController = async (req:Request, res:Response) => {
    const service = await getPetsService(res.locals.userId);
    return res.status(200).json(service);
}

export const getPetToRegisterController = async (req:Request, res:Response) => {
    const service = await getPetToRegisterService(res.locals.userId);
    return res.status(200).json(service);
}

export const updatePetController = async (req:Request, res:Response) => {
    await updatePetService(req.params.petId, res.locals.userId, req.body, req.file?.path.substring(8));
    return res.status(204).send();
}   

export const deletePetController = async (req:Request, res:Response) => {
    await deletePetService(req.params.petId, res.locals.userId);
    return res.status(204).send();
}   
