import redis from "../../../config/redisClient.js";

export const setQuota = async (quota) => {
  await redis.set("quota", quota);
  return quota;
};

export const getQuota = async () => {
  const quota = await redis.get("quota");
  return isNaN(quota) ? quota : Number(quota);
};
