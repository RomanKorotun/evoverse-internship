import listFilesController from "../controllers/listFilesControllers.js";

const listFilesRoute = async (req, res) => {
  await listFilesController(req, res);
};

export default listFilesRoute;
