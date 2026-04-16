import { create } from "zustand";

import { deleteFile, getFiles, getStats, uploadFile } from "../api/filesApi";

export const filesStore = create((set) => ({
  files: [],
  stats: null,

  handleFileUpload: async (formData, headers) => {
    try {
      const data = await uploadFile(formData, headers);

      const files = await getFiles(headers);
      const stats = await getStats(headers);

      set({ files, stats });
    } catch (error) {
      throw error;
    }
  },

  changeQuota: async (quota) => {
    try {
      await updateQuota(quota);
      set((state) => ({
        stats: {
          ...state.stats,
          quotaBytes: quota,
        },
      }));
    } catch (err) {
      throw err;
    }
  },

  fetchStats: async (headers) => {
    try {
      const statsData = await getStats(headers);
      set({ stats: statsData });
    } catch (err) {
      console.error("Помилка при отриманні статистики:", err);
    }
  },

  fetchFiles: async (headers) => {
    try {
      const filesData = await getFiles(headers);
      set({ files: filesData });
    } catch (err) {
      console.error("Помилка при отриманні файлів:", err);
    }
  },

  removeFile: async (id, headers) => {
    try {
      await deleteFile(id, headers);
      const filesData = await getFiles(headers);
      const statsData = await getStats(headers);
      set({ files: filesData, stats: statsData });
    } catch (err) {
      console.error("Помилка при видаленні файлу:", err);
    }
  },
}));
