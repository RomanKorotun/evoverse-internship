import deleteFileController from "../controllers/deleteFileController.js";

const deleteFileRoute = async (req, res) => {
  await deleteFileController(req, res);
};

export default deleteFileRoute;
