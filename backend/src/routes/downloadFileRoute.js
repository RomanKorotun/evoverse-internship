import downloadFileController from "../controllers/downloadFileController.js";

const downloadFileRoute = async (req, res) => {
  await downloadFileController(req, res);
};

export default downloadFileRoute;
