export const convertMbToBytes = (mb) => {
  return Number(mb) * 1024 * 1024;
};

export const convertBytesToMB = (bytes) => {
  if (!bytes && bytes !== 0) return 0;

  return (bytes / (1024 * 1024)).toFixed();
};
