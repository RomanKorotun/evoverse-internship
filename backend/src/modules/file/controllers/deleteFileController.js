import { HttpError } from "../../../helpers/index.js";
import { deleteFileService } from "../services/index.js";

const deleteFileController = async (req, res) => {
  const { filename } = req.params;

  try {
    await deleteFileService(filename);

    res.json({ message: `Файл ${filename} успішно видалений` });
  } catch (error) {
    if (error.code === "ENOENT") {
      throw HttpError(404, `Файл ${filename} не знайдено`);
    }
    throw error;
  }
};

export default deleteFileController;
