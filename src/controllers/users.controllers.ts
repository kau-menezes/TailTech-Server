import { Request, Response } from "express";
import { createUserService, getUserService } from "../services/user.services";


export const createUserController = async (req:Request, res:Response) => {
    const service = await createUserService(req.body);
    return res.status(201).json(service); 
}

export const getUserController = async (req:Request, res:Response) => {
    const service = await getUserService(res.locals.userId);
    return res.status(200).json(service);
}
