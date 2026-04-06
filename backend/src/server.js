import redis from "./config/redisClient.js";

import app from "./app.js";

const PORT = 3030;

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`),
);

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down...`);

  await redis.quit();
  await new Promise((resolve) => redis.once("end", resolve));

  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
