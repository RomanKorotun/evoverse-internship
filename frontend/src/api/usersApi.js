import apiClient from "./apiClient";

export const signup = async (body) => {
  const { data } = await apiClient.post("/users/signup", body);
  return data;
};

export const getUsers = async () => {
  const { data } = await apiClient.get("/users");
  return data;
};

export const getUser = async (headers) => {
  const { email, password } = headers;
  const { data } = await apiClient.get("/users/profile", {
    headers: { "x-email": email, "x-password": password },
  });
  return data;
};

export const deleteUser = async (headers) => {
  const { email, password } = headers;
  const { data } = await apiClient.delete("/accounts/remove", {
    headers: { "x-email": email, "x-password": password },
  });
  return data;
};

export const updateQuota = async (quota, headers) => {
  const { email, password } = headers;
  const { data } = await apiClient.patch(
    `/users/quota`,
    { quota },
    { headers: { "x-email": email, "x-password": password } },
  );
  return data;
};
