import { sendErrorResponse } from "../../../helpers/index.js";
import { MAX_TOTAL_SIZE } from "../../../constants/index.js";
import { statusService } from "../services/index.js";

const statusController = async (req, res) => {
  try {
    const { totalSizeBytes, filesCount } = await statusService();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        totalSizeBytes,
        quotaBytes: MAX_TOTAL_SIZE,
        filesCount,
      }),
    );
  } catch (error) {
    sendErrorResponse(res, 500, "Помилка сервера");
  }
};

export default statusController;
