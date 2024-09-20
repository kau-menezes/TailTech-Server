import { Request, Response } from "express";
import { createPetService, deletePetService, getPetService, updatePetService } from "../services/pets.services";

export const createPetController = async (req:Request, res:Response) => {
    console.log("body:")
    console.log(req.body)
    const service = await createPetService(res.locals.userId, req.body, req.file?.path);
    return res.status(201).json(service);
}

export const getPetController = async (req:Request, res:Response) => {
    const service = await getPetService(req.params.petId);
    return res.status(200).json(service);
}

export const updatePetController = async (req:Request, res:Response) => {
    await updatePetService(req.params.petId, req.body, req.file?.path);
    return res.status(204).send();
}   

export const deletePetController = async (req:Request, res:Response) => {
    await deletePetService(req.params.petId);
    return res.status(204).send();
}   
