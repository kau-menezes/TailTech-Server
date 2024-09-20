import { Router } from "express";
import { deletePetController, getPetController, updatePetController } from "../controllers/pet.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const petRouter = Router();

petRouter.use(authenticate);

petRouter.get("/:petId", getPetController);
petRouter.patch("/:petId", updatePetController);
petRouter.delete("/:petId", deletePetController);

export default petRouter;
