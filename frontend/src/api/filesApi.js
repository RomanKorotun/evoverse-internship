import apiClient from "./apiClient";

export const uploadFile = async (formData, headers) => {
  const { email, password } = headers;
  const { data } = await apiClient.post("/files", formData, {
    headers: {
      "x-email": email,
      "x-password": password,
    },
  });
  return data;
};

export const getFiles = async (headers) => {
  const { email, password } = headers;
  const { data } = await apiClient.get("/files", {
    headers: { "x-email": email, "x-password": password },
  });
  return data;
};

export const getStats = async (headers) => {
  const { email, password } = headers;
  const { data } = await apiClient.get("/files/storage/summary", {
    headers: { "x-email": email, "x-password": password },
  });
  return data;
};

export const deleteFile = async (id, headers) => {
  const { email, password } = headers;
  await apiClient.delete(`/files/${id}`, {
    headers: { "x-email": email, "x-password": password },
  });
};
