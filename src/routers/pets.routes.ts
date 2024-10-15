import { Router } from "express";
import { deletePetController, getPetsController, getPetToRegisterController, updatePetController, updatePetPictureController } from "../controllers/pets.controllers";
import authenticate from "../middlewares/authenticate.middleware";
import upload from "../middlewares/multer.middleware";

const petRouter = Router();

petRouter.use(authenticate);

petRouter.get("", getPetsController);
petRouter.get("/register", getPetToRegisterController);
petRouter.patch("/:petId", updatePetController);
petRouter.patch("/:petId/picture", upload.single("picture"), updatePetPictureController);
petRouter.delete("/:petId", deletePetController);

export default petRouter;
