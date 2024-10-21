import { getDoorPermissionDetailsControllerr, createDoorBlockRangeController, updatePetPermissionsController, deleteDoorBlockRangeController } from "../controllers/permissions.controllers";
import { createDoorBlockRangesSchema, updatePetPermissionSchema } from "../schemas/permissions.schemas";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { Router } from "express";

const permissionRouter = Router();

permissionRouter.use(authenticate);

permissionRouter.get("/pet-doors/:petDoorId", getDoorPermissionDetailsControllerr)
permissionRouter.post("/pet-doors/:petDoorId", validateBody(createDoorBlockRangesSchema), createDoorBlockRangeController)
permissionRouter.delete("/:blockRangeId", deleteDoorBlockRangeController)
permissionRouter.patch("/pet-doors/:petDoorId/pets/:petId", validateBody(updatePetPermissionSchema), updatePetPermissionsController)

export default permissionRouter;