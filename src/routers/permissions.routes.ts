import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { getPetPermissionsControllerr, updatePetPermissionsControllerr } from "../controllers/permissions.controllers";
import validateBody from "../middlewares/validateBody.middleware";
import { updatePetPermissionSchema } from "../schemas/permissions.schemas";

const permissionRouter = Router();

permissionRouter.use(authenticate);

permissionRouter.get("/pets/:petId/pet-doors/:petDoorId", getPetPermissionsControllerr)
permissionRouter.patch("/pets/:petId/pet-doors/:petDoorId", validateBody(updatePetPermissionSchema), updatePetPermissionsControllerr)

export default permissionRouter;