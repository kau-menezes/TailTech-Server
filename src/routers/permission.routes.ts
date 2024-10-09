import { Router } from "express";
import { createPermissionRangeController, deletePermissionRangeController, toggleFreeAccessController, togglePermissionController } from "../controllers/permission.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const permissionRouter = Router();

permissionRouter.get("/pets/:petId/doors/:doorId", authenticate, togglePermissionController);
permissionRouter.get("/:doorId", authenticate, toggleFreeAccessController);
permissionRouter.post("/pets/:petId/doors/:doorId", authenticate, createPermissionRangeController);
permissionRouter.delete("/ranges/:rangeId", authenticate, deletePermissionRangeController);

export default permissionRouter;