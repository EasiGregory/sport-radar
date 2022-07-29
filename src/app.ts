import express from "express";
import morgan from "morgan";
import initScheduler from "./util/scheduler";

const app = express();
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));

initScheduler();

export default app;
