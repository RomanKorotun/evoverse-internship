import { UPLOAD_DIR } from "../../../constants/index.js";
import { HttpError } from "../../../helpers/index.js";
import { getTotalSize } from "../helpers/index.js";
import { setQuota } from "../repositories/quotaRepository.js";

const updateQuotaService = async (body) => {
  const quota = body.quota;

  const totalSize = await getTotalSize(UPLOAD_DIR);

  if (quota < totalSize) {
    throw HttpError(400, "Квота не може бути менша за обсяг існуючих файлів");
  }
  const newQuota = await setQuota(quota);
  return newQuota;
};

export default updateQuotaService;
