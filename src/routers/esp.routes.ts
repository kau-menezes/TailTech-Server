import { Router } from "express";
import { readTagController, registerEspController } from "../controllers/esp.controllers";

const espRouter = Router();

espRouter.post("", registerEspController);
espRouter.get("/pet/:petId", readTagController);

export default espRouter;
