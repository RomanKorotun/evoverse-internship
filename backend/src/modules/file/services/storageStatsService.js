import fs from "fs/promises";

import { getFilesList, getTotalSize } from "../helpers/index.js";
import { UPLOAD_DIR } from "../../../constants/index.js";
import { getQuota } from "../repositories/quotaRepository.js";

const storageStatsService = async () => {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const totalSizeBytes = await getTotalSize(UPLOAD_DIR);
  const files = await getFilesList(UPLOAD_DIR);
  let quotaBytes = await getQuota();

  quotaBytes = isNaN(quotaBytes) ? quotaBytes : Number(quotaBytes);

  return { totalSizeBytes, quotaBytes, filesCount: files.length };
};

export default storageStatsService;
