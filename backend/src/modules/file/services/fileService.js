import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import mime from "mime-types";

import { UPLOAD_DIR } from "../../../constants/index.js";

const getFileStream = async (filename, range) => {
  const filePath = path.resolve(UPLOAD_DIR, filename);

  const stat = await fsPromises.stat(filePath).catch((err) => {
    if (err.code === "ENOENT") {
      const error = new Error(`Файл ${filename} не знайдено`);
      error.status = 404;
      throw error;
    }
    throw err;
  });

  const fileSize = stat.size;
  const mimeType = mime.lookup(filePath) || "application/octet-stream";

  let readStream;
  let headers = {};

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    readStream = fs.createReadStream(filePath, { start, end });

    headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": mimeType,
      status: 206,
    };
  } else {
    readStream = fs.createReadStream(filePath);

    headers = {
      "Content-Length": fileSize,
      "Content-Type": mimeType,
      status: 200,
    };
  }

  return { readStream, headers };
};

export default getFileStream;
