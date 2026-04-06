import express from "express";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import cors from "cors";

import fileRouter from "./modules/file/fileRouter.js";
import { notFound, errorHandler } from "./middlewares/index.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("storage"));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/files", fileRouter);

app.use(notFound);

app.use(errorHandler);

export default app;
