import viewFileController from "../controllers/viewFileController.js";

const viewFileRoute = async (req, res) => {
  await viewFileController(req, res);
};

export default viewFileRoute;
