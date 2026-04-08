import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";

import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import fileRouter from "./modules/file/fileRouter.js";
import { notFound, errorHandler } from "./middlewares/index.js";

const formatlogger = process.env.NODE_ENV === "development" ? "dev" : "short";

const app = express();

app.use(logger(formatlogger));

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.static("storage"));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/files", fileRouter);

app.use(notFound);

app.use(errorHandler);

export default app;
