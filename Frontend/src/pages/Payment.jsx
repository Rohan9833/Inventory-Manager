import { useEffect, useMemo, useState } from "react";

import PaymentForm from "../components/Payment/PaymentForm.payment";
import PaymentTable from "../components/Payment/PaymentTable.payment";
import HomeHeader from "../components/Home/HomeHeader";

import {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
} from "../api/payment.api";

import { getCustomers } from "../api/customer.api";

import "../css/Payment.css";

function Payment() {
  const [payments, setPayments] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [editingPayment, setEditingPayment] = useState(null);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  // ===========================
  // Customers
  // ===========================

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();

      const customerList =
        response.customers ||
        response.data?.customers ||
        response.data ||
        [];

      setCustomers(
        Array.isArray(customerList)
          ? customerList.filter((customer) => customer.status)
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

  const fetchPayments = async () => {
    try {
      const response = await getPayments();

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

  const handleCreate = async (data) => {
    try {
      const response = await createPayment(data);

      alert(response.message);

      await Promise.all([
        fetchPayments(),
        fetchCustomers(),
      ]);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create payment."
      );
    }
  };

  // ===========================
  // Update
  // ===========================

  const handleUpdate = async (id, data) => {
    try {
      const response = await updatePayment(id, data);

      alert(response.message);

      setEditingPayment(null);

      await Promise.all([
        fetchPayments(),
        fetchCustomers(),
      ]);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update payment."
      );
    }
  };

  // ===========================
  // Delete
  // ===========================

  const handleDelete = async (id) => {
    try {
      const response = await deletePayment(id);

      alert(response.message);

      await Promise.all([
        fetchPayments(),
        fetchCustomers(),
      ]);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete payment."
      );
    }
  };

  // ===========================
  // Initial Load
  // ===========================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchCustomers(),
        fetchPayments(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  // ===========================
  // Filter Payments
  // ===========================

  const filteredPayments = useMemo(() => {
    const now = new Date();

    return payments.filter((payment) => {
      const paymentDate = new Date(payment.createdAt);

      // -----------------------
      // Search
      // -----------------------

      const customerName =
        payment.customer?.name?.toLowerCase() || "";

      const paymentMethod =
        payment.paymentMethod?.toLowerCase() || "";

      const note =
        payment.note?.toLowerCase() || "";

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        customerName.includes(searchValue) ||
        paymentMethod.includes(searchValue) ||
        note.includes(searchValue);

      if (!matchesSearch) {
        return false;
      }

      // -----------------------
      // Date Filter
      // -----------------------

      if (activeTab === "all") {
        return true;
      }

      if (activeTab === "today") {
        return (
          paymentDate.toDateString() ===
          now.toDateString()
        );
      }

      if (activeTab === "week") {
        const weekStart = new Date(now);

        weekStart.setDate(
          now.getDate() - now.getDay()
        );

        weekStart.setHours(0, 0, 0, 0);

        return paymentDate >= weekStart;
      }

      if (activeTab === "month") {
        return (
          paymentDate.getMonth() === now.getMonth() &&
          paymentDate.getFullYear() ===
            now.getFullYear()
        );
      }

      return true;
    });
  }, [payments, activeTab, search]);

  // ===========================
  // Render
  // ===========================

  return (
    <div className="payment-page">

      <HomeHeader />

      {/* =========================
          HERO
      ========================= */}

      <section className="payment-hero">

        <div className="payment-hero-content">

          <div className="payment-hero-icon">
            ₹
          </div>

          <div>
            <h1>Payments</h1>

            <p>
              Track and manage customer payments
            </p>
          </div>

        </div>

        <div className="payment-hero-message">
          <span>
            Every payment brings your
            business closer to balance.
          </span>

          <span />
        </div>

      </section>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="payment-content">

        {/* =======================
            TABLE SECTION
        ======================= */}

        <section className="payment-table-section">

          {/* Controls */}

          <div className="payment-section-top">

            <div className="payment-tabs">

              <button
                type="button"
                className={
                  activeTab === "all"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("all")
                }
              >
                All Payments
              </button>

              <button
                type="button"
                className={
                  activeTab === "today"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("today")
                }
              >
                Today
              </button>

              <button
                type="button"
                className={
                  activeTab === "week"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("week")
                }
              >
                This Week
              </button>

              <button
                type="button"
                className={
                  activeTab === "month"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("month")
                }
              >
                This Month
              </button>

            </div>

            {/* Search */}

            <div className="payment-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search payments..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            {/* Filter */}

            <button
              type="button"
              className="payment-filter"
              onClick={() => {
                setSearch("");
                setActiveTab("all");
              }}
            >
              <span>↕</span>
              Reset
            </button>

          </div>

          {/* Table */}

          <PaymentTable
            payments={filteredPayments}
            loading={loading}
            onEdit={setEditingPayment}
            onDelete={handleDelete}
          />

        </section>

        {/* =======================
            FORM SECTION
        ======================= */}

        <section className="payment-form-section">

          <PaymentForm
            customers={customers}
            editingPayment={editingPayment}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancel={() =>
              setEditingPayment(null)
            }
          />

        </section>

      </main>

      {/* =========================
          BOTTOM BANNER
      ========================= */}

      <section className="payment-bottom-banner">

        <div className="payment-bottom-overlay" />

        <div className="payment-bottom-content">

          <div>
            <h2>
              Keep every payment
              <br />
              beautifully organized.
            </h2>

            <p>
              Simple payment tracking for
              smoother business management.
            </p>
          </div>

          <div className="payment-bottom-items">

            <div>
              <span>₹</span>

              <div>
                <strong>
                  Easy Tracking
                </strong>

                <small>
                  Stay on top of payments
                </small>
              </div>
            </div>

            <div>
              <span>✓</span>

              <div>
                <strong>
                  Accurate Records
                </strong>

                <small>
                  Keep transactions organized
                </small>
              </div>
            </div>

            <div>
              <span>↗</span>

              <div>
                <strong>
                  Better Control
                </strong>

                <small>
                  Manage your cash flow
                </small>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Payment;