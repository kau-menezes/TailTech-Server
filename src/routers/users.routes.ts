import { Router } from "express";
import { createUserController, getUserController } from "../controllers/users.controllers";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { createUserSchema } from "../schemas/users.schemas";

const userRouter = Router();

userRouter.post("", validateBody(createUserSchema), createUserController);
userRouter.get("", authenticate, getUserController);

export default userRouter;