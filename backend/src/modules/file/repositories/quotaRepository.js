import redis from "../../../config/redisClient.js";

export const setQuota = async (quota) => {
  await redis.set("quota", quota);
  return quota;
};

export const getQuota = async () => {
  return await redis.get("quota");
};
