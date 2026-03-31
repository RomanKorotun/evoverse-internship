import fs from "fs/promises";
import { UPLOAD_DIR } from "../constants/index.js";
import { sendErrorResponse, getFilesList } from "../helpers/index.js";

const listFilesController = async (req, res) => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const files = await getFilesList(UPLOAD_DIR);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ files }));
  } catch (error) {
    sendErrorResponse(res, 500, "Помилка сервера");
  }
};

export default listFilesController;
