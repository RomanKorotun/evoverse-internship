import fs from "fs";
import fsPromises from "fs/promises";
import { pipeline } from "stream/promises";

import { MAX_TOTAL_SIZE, UPLOAD_DIR } from "../../../constants/index.js";
import {
  checkLimits,
  normalizeFilename,
  getTotalSize,
} from "../helpers/index.js";

const uploadFileService = async (file, info) => {
  await fsPromises.mkdir(UPLOAD_DIR, { recursive: true });
  const totalSize = await getTotalSize(UPLOAD_DIR);

  const safeOriginal = normalizeFilename(info.filename);
  const saveTo = `${UPLOAD_DIR}/${Date.now()}-${safeOriginal}`;
  const createWriteStream = fs.createWriteStream(saveTo);

  let fileSize = 0;

  file.on("data", (chunk) => {
    fileSize += chunk.length;
    const errorMsg = checkLimits(fileSize, totalSize, MAX_TOTAL_SIZE);
    if (errorMsg) {
      const err = new Error(errorMsg);
      err.status = 400;
      createWriteStream.destroy(err);
    }
  });

  try {
    await pipeline(file, createWriteStream);
    return { message: `Файл ${info.filename} успішно завантажено` };
  } catch (error) {
    await fsPromises.unlink(saveTo);
    if (error.status) {
      throw error;
    }

    const err = new Error("Помилка при завантаженні файла");
    err.status = 500;
    throw err;
  }
};

export default uploadFileService;
