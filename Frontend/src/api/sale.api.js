import axiosInstance from "./axios";

// Create Sale
export const createSale = async (data) => {
  const response = await axiosInstance.post(
    "/sale/create",
    data
  );

  return response.data;
};

// Get All Sales
export const getSales = async () => {
  const response = await axiosInstance.get(
    "/sale"
  );

  return response.data;
};

// Get Sale By Id
export const getSaleById = async (id) => {
  const response = await axiosInstance.get(
    `/sale/${id}`
  );

  return response.data;
};