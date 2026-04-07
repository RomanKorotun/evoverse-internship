import redis from "./config/redisClient.js";
import app from "./app.js";

const PORT_INTERNAL = process.env.PORT_INTERNAL || 3000;

const server = app.listen(PORT_INTERNAL, () =>
  console.log(`Server is running on ${PORT_INTERNAL} PORT`),
);

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down...`);

  await redis.quit();
  await new Promise((resolve) => redis.once("end", resolve));

  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
