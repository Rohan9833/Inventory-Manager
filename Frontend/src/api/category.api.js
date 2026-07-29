import axiosInstance from "./axios";

// Create Category
export const createCategory = async (data) => {
  const response = await axiosInstance.post("/category/create", data);
  return response.data;
};

// Get All Categories
export const getCategories = async () => {
  const response = await axiosInstance.get("/category/getall");
  return response.data;
};

// Get Category By Id
export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(`/category/getbyid/${id}`);
  return response.data;
};

// Update Category
export const updateCategory = async (id, data) => {
  const response = await axiosInstance.put(`/category/updatebyid/${id}`, data);

  return response.data;
};

// Change Status
export const changeCategoryStatus = async (id, isActive) => {
  const response = await axiosInstance.patch(`/category/status/${id}`, {
    isActive,
  });

  return response.data;
};
