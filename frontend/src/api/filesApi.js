import axios from "axios";
import { BACKEND_URL } from "../config.js";

axios.defaults.baseURL = BACKEND_URL;

export const uploadFile = async (formData) => {
  const { data } = await axios.post("/files", formData);
  return data;
};

export const getFiles = async () => {
  const { data } = await axios.get("/files");
  return data.files;
};

export const getStats = async () => {
  const { data } = await axios.get("/files/stats");
  return data;
};

export const deleteFile = async (filename) => {
  await axios.delete(`/files/${filename}`);
};

export const setQuota = async (quota) => {
  const { data } = await axios.post("/files/quota", { quota });
  return data;
};

export const getQuota = async () => {
  const { data } = await axios.get("/files/quota");
  return data.quota;
};

export const updateQuota = async (quota) => {
  const { data } = await axios.put("/files/quota", { quota });
  return data.quota;
};
