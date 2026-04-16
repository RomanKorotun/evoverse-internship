import sanitizeFilename from 'sanitize-filename';
import { FILENAME_REGEX } from '../../../common/constants/regex.constants';

const normalizeFilename = (rawName: string) => {
  let originalName = rawName;

  const recoded = Buffer.from(rawName, 'latin1').toString('utf8');

  // Перевіряємо, чи перекодоване ім’я складається з допустимих символів:
  // \p{L} — будь‑які літери Unicode, \p{N} — цифри, а також ., _, -
  const looksValid = FILENAME_REGEX.test(recoded);

  if (looksValid) {
    originalName = recoded;
  }

  // Санітизуємо ім’я, щоб прибрати небезпечні символи
  const safeOriginal = sanitizeFilename(originalName);

  return safeOriginal;
};

export default normalizeFilename;
