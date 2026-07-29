import { useEffect, useState } from "react";

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
        customer:
          editingPayment.customer?._id || "",
        amount: editingPayment.amount,
        paymentMethod:
          editingPayment.paymentMethod,
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

  const selectedCustomer =
    customers.find(
      (customer) =>
        customer._id === formData.customer
    );

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer) {
      return alert(
        "Please select customer."
      );
    }

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {
      return alert(
        "Please enter valid amount."
      );
    }

    if (
      selectedCustomer &&
      Number(formData.amount) >
        selectedCustomer.balance
    ) {
      return alert(
        "Payment cannot be greater than pending balance."
      );
    }

    const payload = {
      customer: formData.customer,
      amount: Number(formData.amount),
      paymentMethod:
        formData.paymentMethod,
      note: formData.note,
    };

    if (editingPayment) {
      await onUpdate(
        editingPayment._id,
        payload
      );
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
    <form onSubmit={handleSubmit}>
      <h2>
        {editingPayment
          ? "Update Payment"
          : "Create Payment"}
      </h2>

      {/* Customer */}

      <div>
        <label>Customer</label>

        <select
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
        <div>
          <strong>
            Pending Balance :
          </strong>{" "}
          ₹{selectedCustomer.balance}
        </div>
      )}

      <br />

      {/* Amount */}

      <div>
        <label>Amount</label>

        <input
          type="number"
          name="amount"
          min="1"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <br />

      {/* Payment Method */}

      <div>
        <label>
          Payment Method
        </label>

        <select
          name="paymentMethod"
          value={
            formData.paymentMethod
          }
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

      <br />

      {/* Note */}

      <div>
        <label>Note</label>

        <textarea
          name="note"
          rows="3"
          value={formData.note}
          onChange={handleChange}
        />
      </div>

      <br />

      <button type="submit">
        {editingPayment
          ? "Update Payment"
          : "Create Payment"}
      </button>
    </form>
  );
}

export default PaymentForm;