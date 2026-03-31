import fs from "fs";
import fsPromises from "fs/promises";
import Busboy from "busboy";
import { pipeline } from "stream/promises";
import {
  checkLimits,
  getTotalSize,
  sendErrorResponse,
  normalizeFilename,
} from "../helpers/index.js";
import { MAX_TOTAL_SIZE, UPLOAD_DIR } from "../constants/index.js";

const uploadController = async (req, res) => {
  try {
    await fsPromises.mkdir(UPLOAD_DIR, { recursive: true });
    const totalSize = await getTotalSize(UPLOAD_DIR);
    const busboy = Busboy({ headers: req.headers });

    busboy.on("file", async (fieldname, file, info) => {
      const safeOriginal = normalizeFilename(info.filename);
      const saveTo = `${UPLOAD_DIR}/${Date.now()}-${safeOriginal}`;
      const createWriteStream = fs.createWriteStream(saveTo);

      let fileSize = 0;
      let limitErrorMsg = null;

      file.on("data", (chunk) => {
        console.log(`Отримано файл: ${chunk.length}`);
        fileSize += chunk.length;
        const errorMsg = checkLimits(fileSize, totalSize, MAX_TOTAL_SIZE);
        if (errorMsg) {
          createWriteStream.destroy();
          limitErrorMsg = errorMsg;
        }
      });

      try {
        await pipeline(file, createWriteStream);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: `Файл ${info.filename} успішшно завантажено`,
          }),
        );
      } catch (error) {
        await fsPromises.unlink(saveTo);
        if (limitErrorMsg) {
          sendErrorResponse(res, 400, limitErrorMsg);
        } else {
          sendErrorResponse(res, 500, "Помилка при завантаженні файла");
        }
      }
    });

    req.pipe(busboy);
  } catch (error) {
    sendErrorResponse(res, 500, "Помилка сервера");
  }
};

export default uploadController;
