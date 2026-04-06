import { listFilesService } from "../services/index.js";

const listFilesController = async (req, res) => {
  const files = await listFilesService();
  res.json({ files });
};

export default listFilesController;
