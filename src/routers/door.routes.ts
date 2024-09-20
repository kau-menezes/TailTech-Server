import { Router } from "express";
import { redeemDoorController, updateDoorController } from "../controllers/door.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const doorRouter = Router();

doorRouter.get("/:code", authenticate, redeemDoorController);
doorRouter.patch("/:mac", authenticate, updateDoorController);

export default doorRouter;
