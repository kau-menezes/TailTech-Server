import express from "express";
import cors from "cors";

import "reflect-metadata";
import "express-async-errors";

import { handleError } from "./middlewares/handleError.middleware";

import userRouter from "./routers/users.routes";
import loginRouter from "./routers/login.routes";
import petRouter from "./routers/pets.routes";
import e from "express";
import path from "path";
import espRouter from "./routers/esp.routes";
import doorRouter from "./routers/doors.routes";
import permissionRouter from "./routers/permissions.routes";
import notificationRouter from "./routers/notifications.routes";


const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/files/uploads", e.static(path.join(__dirname, "./uploads")))

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/notifications", notificationRouter);

app.use("/api/pets", petRouter);
app.use("/api/doors", doorRouter);
app.use("/api/esp", espRouter);
app.use("/api/permissions", permissionRouter);

app.use(handleError);

export default app;