import { Router } from "express";
import { readTagController, registerEspController } from "../controllers/esp.controllers";

const espRouter = Router();

espRouter.get("", registerEspController);
espRouter.get("/pet/:petId", readTagController);

export default espRouter;
