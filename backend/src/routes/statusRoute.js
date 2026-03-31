import statusController from "../controllers/statusController.js";

const statusRoute = async (req, res) => {
  await statusController(req, res);
};

export default statusRoute;
