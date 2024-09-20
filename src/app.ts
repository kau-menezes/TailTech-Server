import express from "express";
import cors from "cors";

import "reflect-metadata";
import "express-async-errors";

import { handleError } from "./middlewares/handleError.middleware";

import userRouter from "./routers/user.routes";
import loginRouter from "./routers/login.routes";
import petRouter from "./routers/pet.routes";
import e from "express";
import path from "path";
import espRouter from "./routers/esp.routes";


const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/files/uploads", e.static(path.join(__dirname, "./uploads")))

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/pets", petRouter);
app.use("/api/esp", espRouter);

app.use(handleError);

export default app;