import {
  uploadRoute,
  deleteFileRoute,
  statusRoute,
  viewFileRoute,
  listFilesRoute,
  downloadFileRoute,
} from "./index.js";
import { sendErrorResponse } from "../helpers/index.js";

const routes = async (req, res) => {
  if (req.method === "POST" && req.url === "/files") {
    await uploadRoute(req, res);
  } else if (req.method === "DELETE" && req.url.startsWith("/files/")) {
    await deleteFileRoute(req, res);
  } else if (req.method === "GET" && req.url === "/files/stats") {
    await statusRoute(req, res);
  } else if (req.method === "GET" && req.url.startsWith("/files/download/")) {
    await downloadFileRoute(req, res);
  } else if (req.method === "GET" && req.url === "/files") {
    await listFilesRoute(req, res);
  } else if (req.method === "GET" && req.url.startsWith("/files/")) {
    await viewFileRoute(req, res);
  } else {
    sendErrorResponse(res, 404, "Not Found");
  }
};

export default routes;
