import axiosInstance from "./axios";

// Stock In
export const stockIn = async (data) => {
  const response = await axiosInstance.post(
    "/inventory/in",
    data
  );

  return response.data;
};

// Stock Out
export const stockOut = async (data) => {
  const response = await axiosInstance.post(
    "/inventory/out",
    data
  );

  return response.data;
};

// History
export const getInventoryHistory = async () => {
  const response = await axiosInstance.get(
    "/inventory/history"
  );

  return response.data;
};