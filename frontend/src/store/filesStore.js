import { create } from "zustand";

import { deleteFile, getFiles, getStats, uploadFile } from "../api/filesApi";

export const filesStore = create((set) => ({
  files: [],
  stats: null,

  // завантажити файла
  handleFileUpload: async (formData) => {
    try {
      const data = await uploadFile(formData);
      const files = await getFiles();
      const stats = await getStats();

      set({ files, stats });
    } catch (error) {
      throw error;
    }
  },

  // отримання статистики файлового сховища
  fetchStats: async () => {
    try {
      const statsData = await getStats();
      set({ stats: statsData });
    } catch (err) {
      console.error("Помилка при отриманні статистики:", err);
    }
  },

  // отримання файлів поточного користувача
  fetchFiles: async () => {
    try {
      const filesData = await getFiles();
      set({ files: filesData });
    } catch (err) {
      console.error("Помилка при отриманні файлів:", err);
    }
  },

  // видалення файла
  removeFile: async (id) => {
    try {
      await deleteFile(id);
      const filesData = await getFiles();
      const statsData = await getStats();
      set({ files: filesData, stats: statsData });
    } catch (err) {
      console.error("Помилка при видаленні файлу:", err);
    }
  },
}));
