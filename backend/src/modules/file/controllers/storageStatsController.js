import { storageStatsService } from "../services/index.js";

const storageStatsController = async (req, res) => {
  const { totalSizeBytes, quotaBytes, filesCount } =
    await storageStatsService();

  res.json({ quotaBytes, totalSizeBytes, filesCount });
};

export default storageStatsController;
