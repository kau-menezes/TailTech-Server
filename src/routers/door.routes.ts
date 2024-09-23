import { Router } from "express";
import { getDoorController as getDoorsController, redeemDoorController, updateDoorController } from "../controllers/door.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const doorRouter = Router();

doorRouter.get("", authenticate, getDoorsController)
doorRouter.get("/:code", authenticate, redeemDoorController);
doorRouter.patch("/:mac", authenticate, updateDoorController);

export default doorRouter;
