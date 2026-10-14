
import api from "./axios";

// Get all products
export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

// Add a new product
export const addProduct = async (newProduct) => {
  const { data } = await api.post("/products", {
    ...newProduct,
    isDeleted: false,
  });

  return data;
};

// Soft delete: move product to Deleted Products
export const deleteProduct = async (id) => {
  const { data } = await api.patch(`/products/${id}`, {
    isDeleted: true,
  });

  return data;
};

// Restore product
export const restoreProduct = async (id) => {
  const { data } = await api.patch(`/products/${id}`, {
    isDeleted: false,
  });

  return data;
};

// Permanently delete product
export const permanentlyDeleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};