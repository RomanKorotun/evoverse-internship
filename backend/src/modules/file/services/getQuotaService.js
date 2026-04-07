import { getQuota } from "../repositories/quotaRepository.js";

const getQuotaService = async () => {
  return await getQuota();
};

export default getQuotaService;
