import { Router } from "express";
import { togglePermissionController } from "../controllers/permission.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const permissionRouter = Router();

permissionRouter.get("/pets/:petId/doors/:doorId", authenticate, togglePermissionController);

export default permissionRouter;