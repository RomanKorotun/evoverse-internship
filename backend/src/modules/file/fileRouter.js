import express from "express";

import {
  deleteFileController,
  downloadFileController,
  getQuotaController,
  listFilesController,
  setQuotaController,
  storageStatsController,
  updateQuotaController,
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

// завантажити файл
fileRouter.post("/", ctrlWrapper(uploadFileControlle));

// встановити квоту для сховища
fileRouter.post(
  "/quota",
  isValidBody(quotaSchema),
  ctrlWrapper(setQuotaController),
);

// отримати поточну квоту сховища
fileRouter.get("/quota", ctrlWrapper(getQuotaController));

// оновити квоту для сховища
fileRouter.put(
  "/quota",
  isValidBody(quotaSchema),
  ctrlWrapper(updateQuotaController),
);

// видалити файла
fileRouter.delete(
  "/:filename",
  validateFilename,
  ctrlWrapper(deleteFileController),
);

// отримати список файлів
fileRouter.get("/", ctrlWrapper(listFilesController));

// отримати статистику сховища
fileRouter.get("/stats", ctrlWrapper(storageStatsController));

// переглянути файл
fileRouter.get("/:filename", validateFilename, ctrlWrapper(viewFileController));

// скачати файл
fileRouter.get(
  "/download/:filename",
  validateFilename,
  ctrlWrapper(downloadFileController),
);

export default fileRouter;
