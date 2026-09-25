import { useEffect, useState } from "react";
import "../../css/CustomerForm.css";

function CustomerForm({
  editingCustomer,
  onCreate,
  onUpdate,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // ==========================
  // Edit Mode
  // ==========================

  useEffect(() => {
    if (editingCustomer) {
      setFormData({
        name: editingCustomer.name || "",
        phone: editingCustomer.phone || "",
        email: editingCustomer.email || "",
        address: editingCustomer.address || "",
      });
    } else {
      resetForm();
    }
  }, [editingCustomer]);

  // ==========================
  // Handle Change
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // Reset
  // ==========================

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return alert("Customer name is required.");
    }

    if (!formData.phone.trim()) {
      return alert("Phone number is required.");
    }

    if (editingCustomer) {
      await onUpdate(
        editingCustomer._id,
        formData
      );
    } else {
      await onCreate(formData);
    }

    resetForm();
  };

  // ==========================
  // Close
  // ==========================

  const handleClose = () => {
    resetForm();

    if (onClose) {
      onClose();
    }
  };

  return (
    <form
      className="customer-form"
      onSubmit={handleSubmit}
    >

      {/* =========================
          FORM HEADER
      ========================= */}

      <div className="customer-form-header">

        <div className="customer-form-heading">

          <div className="customer-form-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="9" cy="8" r="4" />
              <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
              <path
                d="M19 8v6M16 11h6"
                strokeLinecap="round"
              />
            </svg>

          </div>

          <div>
            <h2>
              {editingCustomer
                ? "Update Customer"
                : "Add Customer"}
            </h2>

            <p>
              {editingCustomer
                ? "Update customer information"
                : "Fill in the details to add a new customer"}
            </p>
          </div>

        </div>

        <button
          type="button"
          className="customer-form-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>

      </div>


      {/* =========================
          FIELDS
      ========================= */}

      <div className="customer-form-fields">

        {/* Name */}

        <div className="customer-form-field">

          <label htmlFor="customer-name">
            Customer Name
            <span>*</span>
          </label>

          <div className="customer-input-wrap">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21v-1a7 7 0 0 1 14 0v1" />
            </svg>

            <input
              id="customer-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
            />

          </div>

        </div>


        {/* Phone */}

        <div className="customer-form-field">

          <label htmlFor="customer-phone">
            Phone
            <span>*</span>
          </label>

          <div className="customer-input-wrap">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M6.5 3h3l1.5 4-2 1.5a15 15 0 0 0 6.5 6.5l1.5-2 4 1.5v3c0 1-1 2-2 2C11.3 19.5 4.5 12.7 4.5 4c0-1 1-1 2-1Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              id="customer-phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

          </div>

        </div>


        {/* Email */}

        <div className="customer-form-field">

          <label htmlFor="customer-email">
            Email
          </label>

          <div className="customer-input-wrap">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
              />

              <path
                d="m4 7 8 6 8-6"
                strokeLinecap="round"
              />
            </svg>

            <input
              id="customer-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />

          </div>

        </div>


        {/* Address */}

        <div className="customer-form-field">

          <label htmlFor="customer-address">
            Address
          </label>

          <div className="customer-input-wrap customer-textarea-wrap">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M12 21s7-6.2 7-11A7 7 0 1 0 5 10c0 4.8 7 11 7 11Z"
              />

              <circle cx="12" cy="10" r="2.5" />
            </svg>

            <textarea
              id="customer-address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              placeholder="Enter full address"
            />

          </div>

        </div>

      </div>


      {/* =========================
          FOOTER
      ========================= */}

      <div className="customer-form-footer">

        <button
          type="button"
          className="customer-form-cancel"
          onClick={handleClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="customer-form-submit-btn"
        >

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M5 4h11l3 3v13H5z"
              strokeLinejoin="round"
            />

            <path
              d="M8 4v5h8V4M8 20v-6h8v6"
            />
          </svg>

          {editingCustomer
            ? "Update Customer"
            : "Save Customer"}

        </button>

      </div>

    </form>
  );
}

export default CustomerForm;