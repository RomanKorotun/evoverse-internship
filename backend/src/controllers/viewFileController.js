import path from "path";
import fsPromises from "fs/promises";
import fs from "fs";
import mime from "mime-types";
import { pipeline } from "stream/promises";
import { sendErrorResponse } from "../helpers/index.js";
import { UPLOAD_DIR } from "../constants/index.js";

const viewFileController = async (req, res) => {
  const encodedName = req.url.split("/")[2];
  const filename = decodeURIComponent(encodedName);
  const filePath = path.resolve(UPLOAD_DIR, filename);

  try {
    const stat = await fsPromises.stat(filePath);
    const fileSize = stat.size;
    const mimeType = mime.lookup(filePath);

    const range = req.headers.range;

    // 1. ВІДЕО /

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const readStream = fs.createReadStream(filePath, { start, end });

      readStream.on("data", (chunk) => {
        console.log(`Відправлено файл: ${chunk.length} байт`);
      });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": mimeType,
      });

      return await pipeline(readStream, res);
    } else {
      // 2. ЗВИЧАЙНИЙ ФАЙЛ
      const readStream = fs.createReadStream(filePath);

      readStream.on("data", (chunk) => {
        console.log(`Відправлено файл: ${chunk.length} байт`);
      });

      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": mimeType,
      });

      return await pipeline(readStream, res);
    }
  } catch (error) {
    if (res.headersSent) {
      return;
    }
    if (error.code === "ENOENT") {
      sendErrorResponse(res, 404, `Файл ${filename} не знайдено`);
    } else {
      sendErrorResponse(res, 500, "Помилка при відправці файлу");
    }
  }
};

export default viewFileController;
