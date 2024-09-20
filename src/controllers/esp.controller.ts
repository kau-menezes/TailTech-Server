import { Request, Response } from "express";
import { ensureEspRegister, readPetTagService } from "../services/esp.services";

export const espRegisterController = async (req:Request, res:Response) => {
    await ensureEspRegister(req.params.mac);
    return res.status(204).send();
}

export const readTagController = async (req:Request, res:Response) => {
    await readPetTagService(req.params.mac, req.params.petId);
    return res.status(204).send();
}
