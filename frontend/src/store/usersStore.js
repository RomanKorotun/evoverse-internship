import { create } from "zustand";

import { deleteUser, getUser, getUsers, signup } from "../api/usersApi";
import { updateQuota } from "../api/usersApi";
import { filesStore } from "./filesStore";

export const usersStore = create((set) => ({
  users: [],
  user: null,

  registerUser: async (body) => {
    try {
      await signup(body);
    } catch (err) {
      console.error("Помилка при реєстрації користувача:", err);
      throw err;
    }
  },

  fetchUsers: async () => {
    try {
      const users = await getUsers();
      set({ users });
    } catch (err) {
      console.error("Помилка при отриманні користувачів:", err);
    }
  },

  changeUserQuota: async (quota, headers) => {
    try {
      await updateQuota(quota, headers);
      const { fetchStats } = filesStore.getState();
      await fetchStats(headers);
    } catch (err) {
      console.error("Помилка при зміні квоти:", err);
      throw err;
    }
  },

  fetchUser: async (headers) => {
    try {
      const user = await getUser(headers);
      set({ user });
    } catch (error) {
      console.error("Помилка при отриманні користувача:", err);
    }
  },

  removeUser: async (id, headers) => {
    try {
      await deleteUser(headers);
      set((state) => ({
        users: state.users.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.error("Помилка при видаленні користувача:", err);
    }
  },
}));
