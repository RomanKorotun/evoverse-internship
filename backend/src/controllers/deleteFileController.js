import fs from "fs/promises";
import path from "path";
import { sendErrorResponse } from "../helpers/index.js";
import { UPLOAD_DIR } from "../constants/index.js";

const deleteFileController = async (req, res) => {
  const encodedName = req.url.split("/")[2];
  const filename = decodeURIComponent(encodedName);

  const filePath = path.resolve(UPLOAD_DIR, filename);
  try {
    await fs.unlink(filePath);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Файл ${filename} успішно видалений` }));
  } catch (error) {
    if (error.code === "ENOENT") {
      sendErrorResponse(res, 404, `Файл ${filename} не знайдено`);
    } else {
      sendErrorResponse(res, 500, "Помилка при видаленні файлу");
    }
  }
};

export default deleteFileController;
