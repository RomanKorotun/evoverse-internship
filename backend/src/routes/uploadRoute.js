import uploadController from "../controllers/uploadController.js";

const uploadRoute = async (req, res) => {
  await uploadController(req, res);
};

export default uploadRoute;
