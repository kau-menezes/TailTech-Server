import { getDoorPermissionDetailsControllerr, updateDoorBlockRangesController, updatePetPermissionsController } from "../controllers/permissions.controllers";
import { updateDoorBlockRangesSchema, updatePetPermissionSchema } from "../schemas/permissions.schemas";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { Router } from "express";

const permissionRouter = Router();

permissionRouter.use(authenticate);

permissionRouter.get("/pet-doors/:petDoorId", getDoorPermissionDetailsControllerr)
permissionRouter.patch("/pet-doors/:petDoorId", validateBody(updateDoorBlockRangesSchema), updateDoorBlockRangesController)
permissionRouter.patch("/pet-doors/:petDoorId/pets/:petId", validateBody(updatePetPermissionSchema), updatePetPermissionsController)

export default permissionRouter;