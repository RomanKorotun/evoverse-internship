import { sendErrorResponse } from "../helpers/index.js";
import filesRoutes from "../modules/file/file.routes.js";

const routes = async (req, res) => {
  if (req.url.startsWith("/files")) {
    await filesRoutes(req, res);
  } else {
    sendErrorResponse(res, 404, "Not Found");
  }
};

export default routes;
