import fs from "fs/promises";
import path from "path";

import { UPLOAD_DIR } from "../../../constants/index.js";

const deleteFileService = async (filename) => {
  const filePath = path.resolve(UPLOAD_DIR, filename);
  await fs.unlink(filePath);
};

export default deleteFileService;
