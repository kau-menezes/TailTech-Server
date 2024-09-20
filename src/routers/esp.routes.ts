import { Router } from "express";
import { espRegisterController, readTagController } from "../controllers/esp.controller";

const espRouter = Router();

espRouter.get("/:mac", espRegisterController);
espRouter.get("/:mac/pet/:petId", readTagController);

export default espRouter;
