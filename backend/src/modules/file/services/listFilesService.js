import fs from "fs/promises";

import { UPLOAD_DIR } from "../../../constants/index.js";
import { getFilesList } from "../helpers/index.js";

const listFilesService = async () => {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const files = await getFilesList(UPLOAD_DIR);
  return files;
};

export default listFilesService;
