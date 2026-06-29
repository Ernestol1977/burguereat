import { apiRequest } from "./api";

export const createOrder = (token, items) =>
  apiRequest("/orders", { method: "POST", body: { items }, token });

export const getMyOrders = (token) =>
  apiRequest("/orders/my-orders", { token });

export const getOrders = (token, filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const query = params.toString();
  return apiRequest(`/orders${query ? `?${query}` : ""}`, { token });
};

export const updateOrderStatus = (token, id, status) =>
  apiRequest(`/orders/${id}/status`, {
    method: "PUT",
    body: { status },
    token,
  });

export const deleteOrder = (token, id) =>
  apiRequest(`/orders/${id}`, { method: "DELETE", token });
