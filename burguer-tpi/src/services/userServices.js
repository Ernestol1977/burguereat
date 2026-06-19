import { apiRequest } from "./api";

export const getUsers = (token) => apiRequest("/users", { token });

export const createUser = (token, user) =>
    apiRequest("/users", { method: "POST", body: user, token });

export const updateUser = (token, id, user) =>
    apiRequest(`/users/${id}`, { method: "PUT", body: user, token });

export const updateUserRole = (token, id, role) =>
    apiRequest(`/users/${id}/role`, { method: "PUT", body: { role }, token });

export const deleteUser = (token, id) =>
    apiRequest(`/users/${id}`, { method: "DELETE", token });
