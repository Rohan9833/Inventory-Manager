import { useEffect, useState } from "react";

import PaymentForm from "../components/PaymentForm.payment";
import PaymentTable from "../components/PaymentTable.payment";

import {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
} from "../api/payment.api";

import { getCustomers } from "../api/customer.api";

function Payment() {
  const [payments, setPayments] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);

  const [editingPayment, setEditingPayment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ===========================
  // Customers
  // ===========================

  const fetchCustomers = async () => {
    try {
      const response =
        await getCustomers();

      const customerList =
        response.customers ||
        response.data?.customers ||
        response.data ||
        [];

      setCustomers(
        Array.isArray(customerList)
          ? customerList.filter(
              (c) => c.status
            )
          : []
      );
    } catch (error) {
      console.log(error);

      setCustomers([]);
    }
  };

  // ===========================
  // Payments
  // ===========================

  const fetchPayments =
    async () => {
      try {
        const response =
          await getPayments();

        const paymentList =
          response.payments ||
          response.data?.payments ||
          response.data ||
          [];

        setPayments(
          Array.isArray(paymentList)
            ? paymentList
            : []
        );
      } catch (error) {
        console.log(error);

        setPayments([]);
      }
    };

  // ===========================
  // Create
  // ===========================

  const handleCreate =
    async (data) => {
      try {
        const response =
          await createPayment(data);

        alert(response.message);

        await Promise.all([
          fetchPayments(),
          fetchCustomers(),
        ]);
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  // ===========================
  // Update
  // ===========================

  const handleUpdate =
    async (id, data) => {
      try {
        const response =
          await updatePayment(
            id,
            data
          );

        alert(response.message);

        setEditingPayment(null);

        await Promise.all([
          fetchPayments(),
          fetchCustomers(),
        ]);
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  // ===========================
  // Delete
  // ===========================

  const handleDelete =
    async (id) => {
      try {
        const response =
          await deletePayment(id);

        alert(response.message);

        await Promise.all([
          fetchPayments(),
          fetchCustomers(),
        ]);
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  useEffect(() => {
    const loadData =
      async () => {
        setLoading(true);

        await Promise.all([
          fetchCustomers(),
          fetchPayments(),
        ]);

        setLoading(false);
      };

    loadData();
  }, []);

  return (
    <div>
      <h1>
        Payment Management
      </h1>

      <PaymentForm
        customers={customers}
        editingPayment={
          editingPayment
        }
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <PaymentTable
        payments={payments}
        loading={loading}
        onEdit={setEditingPayment}
        onDelete={
          handleDelete
        }
      />
    </div>
  );
}

export default Payment;