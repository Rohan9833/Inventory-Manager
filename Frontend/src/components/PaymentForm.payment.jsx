import { useEffect, useState } from "react";
import "../css/PaymentForm.css"
function PaymentForm({
  customers,
  editingPayment,
  onCreate,
  onUpdate,
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
        customer: editingPayment.customer?._id || "",
        amount: editingPayment.amount,
        paymentMethod: editingPayment.paymentMethod,
        note: editingPayment.note || "",
      });
    } else {
      setFormData({
        customer: "",
        amount: "",
        paymentMethod: "CASH",
        note: "",
      });
    }
  }, [editingPayment]);

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
    (customer) => customer._id === formData.customer
  );

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer) {
      return alert("Please select customer.");
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      return alert("Please enter valid amount.");
    }

    if (
      selectedCustomer &&
      Number(formData.amount) > selectedCustomer.balance
    ) {
      return alert(
        "Payment cannot be greater than pending balance."
      );
    }

    const payload = {
      customer: formData.customer,
      amount: Number(formData.amount),
      paymentMethod: formData.paymentMethod,
      note: formData.note,
    };

    if (editingPayment) {
      await onUpdate(editingPayment._id, payload);
    } else {
      await onCreate(payload);
    }

    setFormData({
      customer: "",
      amount: "",
      paymentMethod: "CASH",
      note: "",
    });
  };

  return (
    <form
      className="payment-form"
      onSubmit={handleSubmit}
    >
      {/* ==========================
          Header
      ========================== */}

      <div className="payment-form-header">
        <h2 className="payment-form-title">
          {editingPayment
            ? "Update Payment"
            : "Create Payment"}
        </h2>

        <p className="payment-form-subtitle">
          {editingPayment
            ? "Update payment information"
            : "Record a new customer payment"}
        </p>
      </div>

      {/* ==========================
          Form Body
      ========================== */}

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

        {/* Pending Balance */}

        {selectedCustomer && (
          <div className="payment-form-balance">
            <div className="payment-form-balance-content">
              <span className="payment-form-balance-label">
                Pending Balance
              </span>

              <strong className="payment-form-balance-amount">
                ₹{selectedCustomer.balance}
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
              CASH
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="CARD">
              CARD
            </option>

            <option value="BANK">
              BANK
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

      {/* ==========================
          Footer
      ========================== */}

      <div className="payment-form-footer">
        <button
          type="submit"
          className="payment-form-submit-btn"
        >
          {editingPayment
            ? "Update Payment"
            : "Create Payment"}
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;