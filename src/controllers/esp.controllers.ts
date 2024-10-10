import { Request, Response } from "express";
import { registerEsp, readPetTagService } from "../services/esp.services";

export const registerEspController = async (req:Request, res:Response) => {
    const token = await registerEsp(req.params.authorization);
    return res.status(201).json(token);
}

export const readTagController = async (req:Request, res:Response) => {
    await readPetTagService(req.params.authorization, req.params.petId);
    return res.status(204).send();
}
