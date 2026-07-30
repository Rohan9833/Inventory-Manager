import axiosInstance from "./axios";

// ==========================
// Sales Report
// ==========================

export const getSalesReport = async (params = {}) => {
  const response = await axiosInstance.get("/reports/sales", {
    params,
  });

  return response.data;
};

export const exportSalesReport = async (params = {}) => {
  const response = await axiosInstance.get(
    "/reports/sales/export",
    {
      params,
      responseType: "blob",
    }
  );

  return response.data;
};

// ==========================
// Product Report
// ==========================

export const getProductReport = async (params = {}) => {
  const response = await axiosInstance.get("/reports/product", {
    params,
  });

  return response.data;
};

// ==========================
// Inventory Report
// ==========================

export const getInventoryReport = async (params = {}) => {
  const response = await axiosInstance.get("/reports/inventory", {
    params,
  });

  return response.data;
};

// ==========================
// Customer Report
// ==========================

export const getCustomerReport = async (params = {}) => {
  const response = await axiosInstance.get("/reports/customers", {
    params,
  });

  return response.data;
};

// ==========================
// Payment Report
// ==========================

export const getPaymentReport = async (params = {}) => {
  const response = await axiosInstance.get("/reports/payment", {
    params,
  });

  return response.data;
};