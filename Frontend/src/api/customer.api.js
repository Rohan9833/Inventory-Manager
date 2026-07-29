import axiosInstance from "./axios";

// Create Customer
export const createCustomer = async (data) => {
  const response = await axiosInstance.post(
    "/customers/create",
    data
  );

  return response.data;
};

// Get All Customers
export const getCustomers = async () => {
  const response = await axiosInstance.get(
    "/customers/getall"
  );

  return response.data;
};

// Get Customer By Id
export const getCustomerById = async (id) => {
  const response = await axiosInstance.get(
    `/customers/getbyid/${id}`
  );

  return response.data;
};

// Update Customer
export const updateCustomer = async (id, data) => {
  const response = await axiosInstance.put(
    `/customers/update/${id}`,
    data
  );

  return response.data;
};

// Change Status
export const changeCustomerStatus = async (id) => {
  const response = await axiosInstance.patch(
    `/customers/status/${id}`
  );

  return response.data;
};