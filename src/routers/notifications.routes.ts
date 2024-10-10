import { Router } from "express";
import { deleteNoticationController, getNotificationsController } from "../controllers/notifications.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const notificationRouter = Router();

notificationRouter.use(authenticate);

notificationRouter.get("", getNotificationsController);
notificationRouter.delete("/:notificationId", deleteNoticationController);

export default notificationRouter;