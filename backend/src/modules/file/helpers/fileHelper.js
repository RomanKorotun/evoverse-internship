import fs from "fs/promises";
import path from "path";
import sanitizeFilename from "sanitize-filename";

export const getTotalSize = async (uploadDir) => {
  const files = await fs.readdir(uploadDir);
  let totalSize = 0;
  for (const file of files) {
    const pathFile = path.resolve(uploadDir, file);
    const info = await fs.stat(pathFile);
    totalSize += info.size;
  }
  return totalSize;
};

export const getFilesList = async (uploadDir) => {
  const files = await fs.readdir(uploadDir);
  const filesInfo = [];
  for (const file of files) {
    const pathFile = path.resolve(uploadDir, file);
    const info = await fs.stat(pathFile);
    filesInfo.push({
      name: file,
      sizeBytes: info.size,
      createdAt: info.atime,
    });
  }
  return filesInfo;
};

export const checkLimits = (fileSize, totalSize, MAX_TOTAL_SIZE) => {
  if (fileSize > MAX_TOTAL_SIZE) {
    return `Файл перевищує ${MAX_TOTAL_SIZE / (1024 * 1024)}MB`;
  }
  if (fileSize + totalSize > MAX_TOTAL_SIZE) {
    return `Сумарний розмір усіх файлів перевищує ${MAX_TOTAL_SIZE / (1024 * 1024)}MB`;
  }
  return null;
};

export const normalizeFilename = (rawName) => {
  let originalName = rawName;

  const recoded = Buffer.from(rawName, "latin1").toString("utf8");

  // Перевіряємо, чи перекодоване ім’я складається з допустимих символів:
  // \p{L} — будь‑які літери Unicode, \p{N} — цифри, а також ., _, -
  const looksValid = /^[\p{L}\p{N}._-]+$/u.test(recoded);

  if (looksValid) {
    originalName = recoded;
  }

  // Санітизуємо ім’я, щоб прибрати небезпечні символи
  const safeOriginal = sanitizeFilename(originalName);

  return safeOriginal;
};
