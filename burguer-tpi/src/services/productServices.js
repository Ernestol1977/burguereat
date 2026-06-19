import { apiRequest } from "./api";

export const getProducts = () => apiRequest("/products", { token: null });

export const getProduct = (id) =>
    apiRequest(`/products/${id}`, { token: null });

export const createProduct = (token, product) =>
    apiRequest("/products", { method: "POST", body: product, token });

export const updateProduct = (token, id, product) =>
    apiRequest(`/products/${id}`, { method: "PUT", body: product, token });

export const deleteProduct = (token, id) =>
    apiRequest(`/products/${id}`, { method: "DELETE", token });

export const productServices = getProducts;
