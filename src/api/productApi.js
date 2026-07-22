import api from "./axios";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const addProduct = async (newProduct) => {
  const { data } = await api.post("/products", newProduct);
  return data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};