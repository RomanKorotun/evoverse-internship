import { create } from "zustand";

import {
  deleteFile,
  getFiles,
  getQuota,
  getStats,
  setQuota,
  updateQuota,
} from "../api/filesApi";

export const filesStore = create((set) => ({
  stats: null,
  files: [],
  quotaSet: false,

  createQuota: async (quota) => {
    try {
      await setQuota(quota);
      set({ quotaSet: true });
    } catch (err) {
      throw err;
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

  fetchQuota: async () => {
    try {
      const quota = await getQuota();
      set({
        quotaSet: quota > 0,
      });
    } catch (err) {
      console.error("Помилка при отриманні квоти:", err);
    }
  },

  fetchStats: async () => {
    try {
      const statsData = await getStats();
      set({ stats: statsData });
    } catch (err) {
      console.error("Помилка при отриманні статистики:", err);
    }
  },

  fetchFiles: async () => {
    try {
      const filesData = await getFiles();
      set({ files: filesData });
    } catch (err) {
      console.error("Помилка при отриманні файлів:", err);
    }
  },

  removeFile: async (filename) => {
    try {
      await deleteFile(filename);
      const filesData = await getFiles();
      const statsData = await getStats();
      set({ files: filesData, stats: statsData });
    } catch (err) {
      console.error("Помилка при видаленні файлу:", err);
    }
  },
}));
