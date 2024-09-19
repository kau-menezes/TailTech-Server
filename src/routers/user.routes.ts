import { Router } from "express";
import { createUserController, getUserController } from "../controllers/user.controllers";

const userRouter = Router();

userRouter.get("/:userId", getUserController);
userRouter.post("", createUserController);

export default userRouter;