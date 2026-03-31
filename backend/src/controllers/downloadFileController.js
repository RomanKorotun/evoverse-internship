import path from "path";
import fsPromises from "fs/promises";
import fs from "fs";
import mime from "mime-types";
import { pipeline } from "stream/promises";
import { sendErrorResponse } from "../helpers/index.js";
import { UPLOAD_DIR } from "../constants/index.js";

const downloadFileController = async (req, res) => {
  const encodedName = req.url.split("/")[3];
  const filename = decodeURIComponent(encodedName);
  const filePath = path.resolve(UPLOAD_DIR, filename);

  try {
    const info = await fsPromises.stat(filePath);
    const mimeType = mime.lookup(filePath) || "application/octet-stream";
    const readStream = fs.createReadStream(filePath);

    readStream.on("data", (chunk) => {
      console.log(`Відправлено файл: ${chunk.length} байт`);
    });

    const safeName = encodeURIComponent(filename);

    res.writeHead(200, {
      "Content-Type": mimeType,
      "Content-Length": info.size,
      "Content-Disposition": `attachment; filename*=UTF-8''${safeName}`,
    });

    await pipeline(readStream, res);
  } catch (error) {
    if (error.code === "ENOENT") {
      sendErrorResponse(res, 404, `Файл ${filename} не знайдено`);
    } else {
      sendErrorResponse(res, 500, "Помилка при відправці файлу");
    }
  }
};

export default downloadFileController;
