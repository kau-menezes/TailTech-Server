import { Router } from "express";
import { toggleFreeAccessController, togglePermissionController } from "../controllers/permission.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const permissionRouter = Router();

permissionRouter.get("/pets/:petId/doors/:doorId", authenticate, togglePermissionController);
permissionRouter.get("/:doorId", authenticate, toggleFreeAccessController);

export default permissionRouter;