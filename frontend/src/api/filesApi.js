import apiClient from "./apiClient";

// завантажити файл
export const uploadFile = async (formData) => {
  const { data } = await apiClient.post("/files", formData);
  return data;
};

// отримання файлів поточного користувача
export const getFiles = async () => {
  const { data } = await apiClient.get("/files");
  return data;
};

// отримання статистики файлового сховища
export const getStats = async () => {
  const { data } = await apiClient.get("/files/storage/summary");
  return data;
};

// видалення файла
export const deleteFile = async (id) => {
  await apiClient.delete(`/files/${id}`);
};
