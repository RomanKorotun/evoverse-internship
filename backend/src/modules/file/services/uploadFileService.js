import fs from "fs";
import fsPromises from "fs/promises";
import { pipeline } from "stream/promises";

import { UPLOAD_DIR } from "../../../constants/index.js";
import {
  checkLimits,
  getTotalSize,
  normalizeFilename,
} from "../helpers/index.js";
import { HttpError } from "../../../helpers/index.js";
import { getQuota } from "../repositories/quotaRepository.js";

const uploadFileService = async (file, info) => {
  fsPromises.mkdir(UPLOAD_DIR, { recursive: true });

  const totalSize = await getTotalSize(UPLOAD_DIR);
  const safeOriginal = normalizeFilename(info.filename);
  const storedName = `${Date.now()}-${safeOriginal}`;
  const saveTo = `${UPLOAD_DIR}/${storedName}`;
  const createWriteStream = fs.createWriteStream(saveTo);

  let fileSize = 0;

  const quotaBytes = await getQuota();

  file.on("data", (chunk) => {
    fileSize += chunk.length;
    console.log(`Завантажено ${chunk.length} байт`);
    const errorMessage = checkLimits(fileSize, totalSize, quotaBytes);
    if (errorMessage) {
      createWriteStream.destroy(HttpError(413, errorMessage));
    }
  });

  file.on("end", () => {
    console.log(
      `Завершено завантаження файлу ${info.filename}. Загальний розмір ${fileSize} байт`,
    );
  });

  try {
    await pipeline(file, createWriteStream);
    return { message: `Файл ${storedName} успішно завантажено` };
  } catch (error) {
    await fsPromises.unlink(saveTo);

    if (error.status) {
      throw error;
    }

    throw HttpError(500, "Помилка при завантаженні файла");
  }
};

export default uploadFileService;
