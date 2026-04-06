import { setQuotaService } from "../services/index.js";

const setQuotaController = async (req, res) => {
  const quota = await setQuotaService(req.body);
  res.status(201).json({ quota });
};

export default setQuotaController;
