import fs from 'fs/promises';
import { Logger } from '@nestjs/common';

const readJsonFile = async <T>(
  filePath: string,
  fileName: string,
  logger: Logger,
): Promise<T[]> => {
  let data: string;

  try {
    data = await fs.readFile(filePath, 'utf8');
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    logger.error(`Помилка при читанні ${fileName}`, error.stack);
    throw error;
  }

  try {
    return JSON.parse(data) as T[];
  } catch (error: any) {
    logger.error(`Invalid JSON format in ${fileName}`, error.stack);
    throw new Error(`[STORAGE] Corrupted JSON file: ${fileName}`);
  }
};

export default readJsonFile;
