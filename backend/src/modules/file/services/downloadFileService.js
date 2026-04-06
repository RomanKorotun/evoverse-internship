import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import mime from "mime-types";

import { UPLOAD_DIR } from "../../../constants/index.js";

const downloadFileService = async (filename) => {
  const filePath = path.resolve(UPLOAD_DIR, filename);
  const info = await fsPromises.stat(filePath);
  const mimeType = mime.lookup(filePath) || "application/octet-stream";
  const readStream = fs.createReadStream(filePath);

  return { readStream, info, mimeType };
};

export default downloadFileService;
