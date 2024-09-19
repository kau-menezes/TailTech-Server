import express from "express";
import cors from "cors";

import "reflect-metadata";
import "express-async-errors";

import { handleError } from "./middlewares/handleError.middleware";

import userRouter from "./routers/user.routes";
import loginRouter from "./routers/login.routes";


const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.use(handleError)

export default app;