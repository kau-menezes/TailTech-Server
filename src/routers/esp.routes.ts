import { Router } from "express";
import { readTagController, registerEspController } from "../controllers/esp.controller";

const espRouter = Router();

espRouter.get("/users/:userId", registerEspController);
espRouter.get("/users/:userId/pet-doors/:petDoorId/pet/:petId", readTagController);

export default espRouter;
