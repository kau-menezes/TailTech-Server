import { Router } from "express";
import { deletePetController, getPetsController, getPetToRegisterController, updatePetController } from "../controllers/pets.controllers";
import authenticate from "../middlewares/authenticate.middleware";
import upload from "../middlewares/multer.middleware";

const petRouter = Router();

petRouter.use(authenticate);

petRouter.get("", getPetsController);
petRouter.get("/register", getPetToRegisterController);
petRouter.patch("/:petId", upload.single("picture"), updatePetController);
petRouter.delete("/:petId", deletePetController);

export default petRouter;
