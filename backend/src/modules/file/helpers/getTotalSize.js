import fs from "fs/promises";
import path from "path";

const getTotalSize = async (uploadDir) => {
  const files = await fs.readdir(uploadDir);
  let totalSize = 0;
  for (const file of files) {
    const pathFile = path.resolve(uploadDir, file);
    const info = await fs.stat(pathFile);
    totalSize += info.size;
  }
  return totalSize;
};

export default getTotalSize;
