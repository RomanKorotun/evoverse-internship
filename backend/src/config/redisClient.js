import Redis from "ioredis";

const redis = new Redis({
  host: "redis",
  port: 6379,
});

redis.on("ready", () => console.log("Redis готовий"));
redis.on("error", (err) => console.error("Redis error:", err));
redis.on("close", () => console.warn("Redis закрито"));
redis.on("end", () => console.warn("Redis з'єднання завершено"));

export default redis;
