import express from "express";

import {
  deleteFileController,
  downloadFileController,
  listFilesController,
  setQuotaController,
  storageStatsController,
  uploadFileControlle,
  viewFileController,
} from "./controllers/index.js";
import {
  isValidBody,
  ctrlWrapper,
  validateFilename,
} from "../../middlewares/index.js";
import { quotaSchema } from "./validations/index.js";

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Ендпоінти для роботи з файлами
 */

const fileRouter = express.Router();

fileRouter.post("/", ctrlWrapper(uploadFileControlle));

fileRouter.post(
  "/quota",
  isValidBody(quotaSchema),
  ctrlWrapper(setQuotaController),
);

fileRouter.delete(
  "/:filename",
  validateFilename,
  ctrlWrapper(deleteFileController),
);

fileRouter.get("/", ctrlWrapper(listFilesController));

fileRouter.get("/stats", ctrlWrapper(storageStatsController));

fileRouter.get("/:filename", validateFilename, ctrlWrapper(viewFileController));

fileRouter.get(
  "/download/:filename",
  validateFilename,
  ctrlWrapper(downloadFileController),
);

export default fileRouter;
