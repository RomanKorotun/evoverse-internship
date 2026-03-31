import http from "http";
import routes from "./routes/routes.js";
import cors from "./middlewares/cors.js";

const app = http.createServer(async (req, res) => {
  cors(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  await routes(req, res);
});

export default app;
