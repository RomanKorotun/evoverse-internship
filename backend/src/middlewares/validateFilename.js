import { HttpError } from "../helpers/index.js";
import { FILENAME_REGEX } from "../regex/index.js";

const validateFilename = (req, res, next) => {
  const { filename } = req.params;
  if (!FILENAME_REGEX.test(filename)) {
    throw HttpError(400, "Некоректне ім’я файлу");
  }
  next();
};

export default validateFilename;
