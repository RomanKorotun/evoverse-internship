import fs from "fs/promises";
import {
  getFilesList,
  getTotalSize,
  sendErrorResponse,
} from "../helpers/index.js";
import { MAX_TOTAL_SIZE, UPLOAD_DIR } from "../constants/index.js";

const statusController = async (req, res) => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const totalSizeBytes = await getTotalSize(UPLOAD_DIR);
    const files = await getFilesList(UPLOAD_DIR);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        totalSizeBytes,
        quotaBytes: MAX_TOTAL_SIZE,
        filesCount: files.length,
      }),
    );
  } catch (error) {
    sendErrorResponse(res, 500, "Помилка сервера");
  }
};

export default statusController;
