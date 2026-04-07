import { updateQuotaService } from "../services/index.js";

const updateQuotaController = async (req, res) => {
  const quota = await updateQuotaService(req.body);

  res.json({ quota });
};

export default updateQuotaController;
