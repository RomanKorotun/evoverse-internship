const checkLimits = (
  fileSize: number,
  totalSize: number,
  MAX_TOTAL_SIZE: number,
) => {
  if (fileSize > MAX_TOTAL_SIZE) {
    return `Файл перевищує ${MAX_TOTAL_SIZE / (1024 * 1024)}MB`;
  }
  if (fileSize + totalSize > MAX_TOTAL_SIZE) {
    return `Сумарний розмір усіх файлів перевищує ${MAX_TOTAL_SIZE / (1024 * 1024)}MB`;
  }
  return null;
};

export default checkLimits;
