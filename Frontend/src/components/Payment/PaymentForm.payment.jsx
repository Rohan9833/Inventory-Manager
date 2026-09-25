import { useEffect, useState } from "react";

import "../../css/PaymentForm.css";

function PaymentForm({
  customers = [],
  editingPayment,
  onCreate,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    paymentMethod: "CASH",
    note: "",
  });

  // ==========================
  // Edit Mode
  // ==========================

  useEffect(() => {
    if (editingPayment) {
      setFormData({
        customer:
          editingPayment.customer?._id || "",
        amount:
          editingPayment.amount || "",
        paymentMethod:
          editingPayment.paymentMethod || "CASH",
        note:
          editingPayment.note || "",
      });
    } else {
      resetForm();
    }
  }, [editingPayment]);

  // ==========================
  // Reset
  // ==========================

  const resetForm = () => {
    setFormData({
      customer: "",
      amount: "",
      paymentMethod: "CASH",
      note: "",
    });
  };

  // ==========================
  // Change Handler
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // Selected Customer
  // ==========================

  const selectedCustomer = customers.find(
    (customer) =>
      customer._id === formData.customer
  );

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer) {
      alert("Please select customer.");
      return;
    }

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {
      alert("Please enter a valid amount.");
      return;
    }

    if (
      selectedCustomer &&
      Number(formData.amount) >
        Number(selectedCustomer.balance || 0)
    ) {
      alert(
        "Payment cannot be greater than pending balance."
      );
      return;
    }

    const payload = {
      customer: formData.customer,
      amount: Number(formData.amount),
      paymentMethod:
        formData.paymentMethod,
      note: formData.note.trim(),
    };

    if (editingPayment) {
      await onUpdate(
        editingPayment._id,
        payload
      );
    } else {
      await onCreate(payload);
    }

    resetForm();
  };

  // ==========================
  // Render
  // ==========================

  return (
    <form
      className="payment-form"
      onSubmit={handleSubmit}
    >

      {/* =========================
          HEADER
      ========================= */}

      <div className="payment-form-header">

        <div className="payment-form-heading">

          <div className="payment-form-heading-icon">
            ₹
          </div>

          <div>

            <h2 className="payment-form-title">
              {editingPayment
                ? "Update Payment"
                : "Record Payment"}
            </h2>

            <p className="payment-form-subtitle">
              {editingPayment
                ? "Update payment information"
                : "Record a new customer payment"}
            </p>

          </div>

        </div>

      </div>

      {/* =========================
          FORM BODY
      ========================= */}

      <div className="payment-form-body">

        {/* Customer */}

        <div className="payment-form-field">

          <label
            className="payment-form-label"
            htmlFor="payment-customer"
          >
            Customer
            <span className="payment-form-required">
              *
            </span>
          </label>

          <select
            id="payment-customer"
            className="payment-form-select"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            disabled={!!editingPayment}
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer._id}
                value={customer._id}
              >
                {customer.name}
              </option>
            ))}
          </select>

        </div>

        {/* Customer Preview */}

        {selectedCustomer && (
          <div className="payment-form-customer-preview">

            <div className="payment-form-customer-avatar">
              {selectedCustomer.name
                ?.charAt(0)
                ?.toUpperCase() || "?"}
            </div>

            <div>

              <strong>
                {selectedCustomer.name}
              </strong>

              <small>
                Customer
              </small>

            </div>

          </div>
        )}

        {/* Pending Balance */}

        {selectedCustomer && (
          <div className="payment-form-balance">

            <div className="payment-form-balance-content">

              <div>

                <span className="payment-form-balance-label">
                  Pending Balance
                </span>

                <small>
                  Outstanding amount
                </small>

              </div>

              <strong className="payment-form-balance-amount">
                ₹
                {Number(
                  selectedCustomer.balance || 0
                ).toLocaleString("en-IN")}
              </strong>

            </div>

          </div>
        )}

        {/* Amount */}

        <div className="payment-form-field">

          <label
            className="payment-form-label"
            htmlFor="payment-amount"
          >
            Amount
            <span className="payment-form-required">
              *
            </span>
          </label>

          <div className="payment-form-input-wrapper">

            <span className="payment-form-currency">
              ₹
            </span>

            <input
              id="payment-amount"
              className="payment-form-input payment-form-amount-input"
              type="number"
              name="amount"
              min="1"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter payment amount"
            />

          </div>

        </div>

        {/* Payment Method */}

        <div className="payment-form-field">

          <label
            className="payment-form-label"
            htmlFor="payment-method"
          >
            Payment Method
            <span className="payment-form-required">
              *
            </span>
          </label>

          <select
            id="payment-method"
            className="payment-form-select"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="CASH">
              Cash
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="CARD">
              Card
            </option>

            <option value="BANK">
              Bank Transfer
            </option>
          </select>

        </div>

        {/* Note */}

        <div className="payment-form-field">

          <label
            className="payment-form-label"
            htmlFor="payment-note"
          >
            Note
          </label>

          <textarea
            id="payment-note"
            className="payment-form-textarea"
            name="note"
            rows="3"
            value={formData.note}
            onChange={handleChange}
            placeholder="Add a note about this payment..."
          />

        </div>

      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <div className="payment-form-footer">

        {editingPayment && (
          <button
            type="button"
            className="payment-form-reset-btn"
            onClick={() => {
              resetForm();

              if (onCancel) {
                onCancel();
              }
            }}
          >
            Cancel
          </button>
        )}

        {!editingPayment && (
          <button
            type="button"
            className="payment-form-reset-btn"
            onClick={resetForm}
          >
            Reset
          </button>
        )}

        <button
          type="submit"
          className="payment-form-submit-btn"
        >
          {editingPayment
            ? "Update Payment"
            : "Record Payment"}
        </button>

      </div>

    </form>
  );
}

export default PaymentForm;