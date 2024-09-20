import { Router } from "express";
import { deletePetController, getPetController, updatePetController, updatePetPictureController } from "../controllers/pet.controllers";
import authenticate from "../middlewares/authenticate.middleware";
import upload from "../middlewares/multer.middleware";

const petRouter = Router();

petRouter.use(authenticate);

petRouter.get("/:petId", getPetController);
petRouter.patch("/:petId", updatePetController);
petRouter.patch("/:petId/picture", upload.single("picture"), updatePetPictureController);
petRouter.delete("/:petId", deletePetController);

export default petRouter;
