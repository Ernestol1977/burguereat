const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const getStoredToken = () => localStorage.getItem("token");

export const apiRequest = async (endpoint, options = {}) => {
  const { body, token = getStoredToken(), headers = {}, ...rest } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Error de conexion");
  }

  return data;
};
