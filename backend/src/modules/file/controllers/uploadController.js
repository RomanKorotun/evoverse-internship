import Busboy from "busboy";

import { sendErrorResponse } from "../../../helpers/index.js";
import { uploadFileService } from "../services/index.js";

const uploadController = async (req, res) => {
  const busboy = Busboy({ headers: req.headers });

  busboy.on("file", async (fieldname, file, info) => {
    try {
      const result = await uploadFileService(file, info);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (error) {
      sendErrorResponse(
        res,
        error.status || 500,
        error.message || "Помилка сервера",
      );
    }
  });

  req.pipe(busboy);
};

export default uploadController;
