import { pipeline } from "stream/promises";

import { getFileStream } from "../services/index.js";

const viewFileController = async (req, res) => {
  try {
    const { filename } = req.params;

    const range = req.headers.range;

    const { readStream, headers, statusCode } = await getFileStream(
      filename,
      range,
    );

    res.set(headers);
    res.status(statusCode);

    readStream.on("data", (chunk) => {
      console.log(`Прочитано ${chunk.length} байт з диска`);
    });

    readStream.on("end", () => {
      console.log(`Файл ${filename} повністю прочитано з диска`);
    });

    res.on("finish", () => {
      console.log(`Файл ${filename} повністю віддано клієнту`);
    });

    await pipeline(readStream, res);
  } catch (error) {
    if (res.headersSent) return;
    throw error;
  }
};

export default viewFileController;
