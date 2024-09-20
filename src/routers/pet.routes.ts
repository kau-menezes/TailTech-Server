import { Router } from "express";
import { createPetController, deletePetController, getPetController, updatePetController } from "../controllers/pet.controllers";

const petRouter = Router();

petRouter.post("/:userId", createPetController);
petRouter.get("/:petId", getPetController);
petRouter.patch("/:petId", updatePetController);
petRouter.delete("/:petId", deletePetController);

export default petRouter;
