import { Router } from "express";
import { deletePetController, getPetController, updatePetController } from "../controllers/pets.controllers";
import authenticate from "../middlewares/authenticate.middleware";
import upload from "../middlewares/multer.middleware";

const petRouter = Router();

petRouter.use(authenticate);

petRouter.get("/:petId", getPetController);
petRouter.patch("/:petId", upload.single("picture"), updatePetController);
petRouter.delete("/:petId", deletePetController);

export default petRouter;
