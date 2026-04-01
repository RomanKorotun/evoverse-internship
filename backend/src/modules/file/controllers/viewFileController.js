import { pipeline } from "stream/promises";

import { getFileStream } from "../services/index.js";
import { sendErrorResponse } from "../../../helpers/index.js";

const viewFileController = async (req, res) => {
  try {
    const encodedName = req.url.split("/")[2];
    const filename = decodeURIComponent(encodedName);
    const range = req.headers.range;

    const { readStream, headers } = await getFileStream(filename, range);

    const { status, ...restHeaders } = headers;
    res.writeHead(status, restHeaders);

    readStream.on("data", (chunk) => {
      console.log(`Відправлено файл: ${chunk.length} байт`);
    });

    await pipeline(readStream, res);
  } catch (error) {
    if (res.headersSent) return;

    sendErrorResponse(
      res,
      error.status || 500,
      error.message || "Помилка при відправці файлу",
    );
  }
};

export default viewFileController;
