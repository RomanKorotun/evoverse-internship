import fs from "fs/promises";
import path from "path";

const getFilesList = async (uploadDir) => {
  const files = await fs.readdir(uploadDir);
  const filesInfo = [];
  for (const file of files) {
    const pathFile = path.resolve(uploadDir, file);
    const info = await fs.stat(pathFile);
    filesInfo.push({
      name: file,
      sizeBytes: info.size,
      createdAt: info.atime,
    });
  }
  return filesInfo;
};

export default getFilesList;
