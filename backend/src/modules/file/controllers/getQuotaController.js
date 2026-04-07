import { getQuotaService } from "../services/index.js";

const getQuotaController = async (req, res) => {
  const quota = await getQuotaService();
  res.json({ quota });
};

export default getQuotaController;
