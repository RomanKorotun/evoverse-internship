import fs from "fs/promises";

import { getFilesList, getTotalSize } from "../helpers/index.js";
import { UPLOAD_DIR } from "../../../constants/index.js";

const statusService = async () => {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const totalSizeBytes = await getTotalSize(UPLOAD_DIR);
  const files = await getFilesList(UPLOAD_DIR);
  return { totalSizeBytes, filesCount: files.length };
};

export default statusService;
