import Busboy from "busboy";

import { uploadFileService } from "../services/index.js";

const uploadFileController = async (req, res) => {
  const busboy = Busboy({ headers: req.headers });

  const result = await new Promise((resolve, reject) => {
    busboy.on("file", async (fieldname, file, info) => {
      try {
        const data = await uploadFileService(file, info);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });

    busboy.on("error", reject);

    req.pipe(busboy);
  });

  res.status(201).json(result);
};

export default uploadFileController;
