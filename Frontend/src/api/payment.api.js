import axiosInstance from "./axios";

// Create Payment
export const createPayment = async (data) => {
  const response = await axiosInstance.post(
    "/payments/create",
    data
  );

  return response.data;
};

// Get All Payments
export const getPayments = async () => {
  const response = await axiosInstance.get(
    "/payments"
  );

  return response.data;
};

// Get Payment By Id
export const getPaymentById = async (id) => {
  const response = await axiosInstance.get(
    `/payments/${id}`
  );

  return response.data;
};

// Update Payment
export const updatePayment = async (
  id,
  data
) => {
  const response = await axiosInstance.put(
    `/payments/update/${id}`,
    data
  );

  return response.data;
};

// Delete Payment
export const deletePayment = async (id) => {
  const response = await axiosInstance.delete(
    `/payments/${id}`
  );

  return response.data;
};