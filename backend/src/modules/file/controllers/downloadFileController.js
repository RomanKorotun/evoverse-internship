import { pipeline } from "stream/promises";

import { downloadFileService } from "../services/index.js";
import { HttpError } from "../../../helpers/index.js";

const downloadFileController = async (req, res) => {
  const { filename } = req.params;

  try {
    const { readStream, info, mimeType } = await downloadFileService(filename);

    readStream.on("data", (chunk) => {
      console.log(`Прочитано ${chunk.length} байт з диска`);
    });

    readStream.on("end", () => {
      console.log(`Файл ${filename} повністю прочитано з диска`);
    });

    res.on("finish", () => {
      console.log(`Файл ${filename} повністю віддано клієнту`);
    });

    const safeName = encodeURIComponent(filename);

    res.set({
      "Content-Type": mimeType,
      "Content-Length": info.size,
      "Content-Disposition": `attachment; filename*=UTF-8''${safeName}`,
    });

    await pipeline(readStream, res);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw HttpError(404, `Файл ${filename} не знайдено`);
    }
    throw error;
  }
};

export default downloadFileController;
