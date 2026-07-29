import { useEffect, useState } from "react";

import CustomerForm from "../components/CustomerForm.customer";
import CustomerTable from "../components/CustomerTable.customer";

import {
  createCustomer,
  getCustomers,
  updateCustomer,
  changeCustomerStatus,
} from "../api/customer.api";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // ===========================
  // Fetch Customers
  // ===========================

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();

      // Handle different response structures
      const customerList =
        response.customers ||
        response.data?.customers ||
        response.data ||
        [];

      setCustomers(Array.isArray(customerList) ? customerList : []);
    } catch (error) {
      console.log(error);
      setCustomers([]);
    }
  };

  // ===========================
  // Create
  // ===========================

  const handleCreate = async (data) => {
    try {
      const response = await createCustomer(data);

      alert(response.message);

      await fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===========================
  // Update
  // ===========================

  const handleUpdate = async (id, data) => {
    try {
      const response = await updateCustomer(id, data);

      alert(response.message);

      setEditingCustomer(null);

      await fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ===========================
  // Status
  // ===========================

  const handleStatus = async (id) => {
    try {
      const response = await changeCustomerStatus(id);

      alert(response.message);

      await fetchCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await fetchCustomers();

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div>
      <h1>Customer Management</h1>

      <CustomerForm
        editingCustomer={editingCustomer}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <CustomerTable
        customers={customers}
        loading={loading}
        onEdit={setEditingCustomer}
        onStatus={handleStatus}
      />
    </div>
  );
}

export default Customer;