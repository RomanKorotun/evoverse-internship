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

  const headers = {
    "Content-Type": mimeType,
  };

  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = Number(startStr);
    const end = endStr ? Number(endStr) : fileSize - 1;

    console.log("start", start);
    console.log("end", end);

    const chunkSize = end - start + 1;
    console.log("chunkSize", chunkSize);

    return {
      readStream: fs.createReadStream(filePath, { start, end }),
      headers: {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
      },
      statusCode: 206,
    };
  }

  return {
    readStream: fs.createReadStream(filePath),
    headers: {
      ...headers,
      "Content-Length": fileSize,
    },
    statusCode: 200,
  };
};

export default getFileStream;
