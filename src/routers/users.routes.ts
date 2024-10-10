import { Router } from "express";
import { createUserController, getUserController } from "../controllers/users.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("/:userId", authenticate, getUserController);

export default userRouter;