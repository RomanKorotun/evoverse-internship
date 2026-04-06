import { setQuota } from "../repositories/quotaRepository.js";

const setQuotaService = async (body) => {
  const quota = await setQuota(body.quota);

  return quota;
};

export default setQuotaService;
