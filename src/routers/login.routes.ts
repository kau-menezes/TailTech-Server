import { Router } from "express";
import { loginController } from "../controllers/login.controller";

const loginRouter = Router();

loginRouter.post("", loginController);

export default loginRouter;