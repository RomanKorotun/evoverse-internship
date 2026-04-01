import { sendErrorResponse } from "../../../helpers/index.js";
import { listFilesService } from "../services/index.js";

const listFilesController = async (req, res) => {
  try {
    const files = await listFilesService();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ files }));
  } catch (error) {
    sendErrorResponse(res, 500, "Помилка сервера");
  }
};

export default listFilesController;
