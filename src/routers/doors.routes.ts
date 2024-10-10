import { Router } from "express";
import { getDoorsController as getDoorsController, updateDoorController } from "../controllers/doors.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const doorRouter = Router();

doorRouter.use(authenticate);

doorRouter.get("", getDoorsController)
doorRouter.patch("/:petDoorId", updateDoorController);

export default doorRouter;
