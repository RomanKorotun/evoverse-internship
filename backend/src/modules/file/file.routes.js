import {
  deleteFileController,
  downloadFileController,
  listFilesController,
  statusController,
  uploadController,
  viewFileController,
} from "./controllers/index.js";
import { sendErrorResponse } from "../../helpers/index.js";

export const filesRoutes = async (req, res) => {
  if (req.method === "POST" && req.url === "/files") {
    await uploadController(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/files/")) {
    await deleteFileController(req, res);
  } else if (req.method === "GET" && req.url === "/files/stats") {
    await statusController(req, res);
  } else if (req.method === "GET" && req.url.startsWith("/files/download/")) {
    await downloadFileController(req, res);
  } else if (req.method === "GET" && req.url === "/files") {
    await listFilesController(req, res);
  } else if (req.method === "GET" && req.url.startsWith("/files/")) {
    await viewFileController(req, res);
  } else {
    sendErrorResponse(res, 404, "Not Found");
  }
};

export default filesRoutes;
