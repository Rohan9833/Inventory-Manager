import axiosInstance from "./axios";

// Create Product
export const createProduct = async (data) => {
  const response = await axiosInstance.post("/product/create", data);
  return response.data;
};

// Get All Products
export const getProducts = async () => {
  const response = await axiosInstance.get("/product/getall");
  return response.data;
};

// Get Product By Id
export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/product/getbyid/${id}`);
  return response.data;
};

// Update Product
export const updateProduct = async (id, data) => {
  const response = await axiosInstance.put(`/product/updatebyid/${id}`, data);

  return response.data;
};

// Delete (Soft Delete)
export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/product/delete/${id}`);

  return response.data;
};

// Restore Product
export const restoreProduct = async (id) => {
  const response = await axiosInstance.patch(`/product/restore/${id}`);

  return response.data;
};
