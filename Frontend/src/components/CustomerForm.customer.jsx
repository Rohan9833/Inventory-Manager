import { useEffect, useState } from "react";
import "../css/CustomerForm.css";

function CustomerForm({ editingCustomer, onCreate, onUpdate }) {
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
  // Reset Form
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
      await onUpdate(editingCustomer._id, formData);
    } else {
      await onCreate(formData);
    }

    resetForm();
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <div className="customer-form-header">
        <h2 className="customer-form-title">
          {editingCustomer ? "Update Customer" : "Create Customer"}
        </h2>
        <p className="customer-form-subtitle">
          {editingCustomer
            ? "Update customer information"
            : "Add a new customer to your records"}
        </p>
      </div>

      <div className="customer-form-grid">
        <div className="customer-form-field customer-form-field-half">
          <label className="customer-form-label" htmlFor="customer-name">
            Name <span className="customer-form-required">*</span>
          </label>
          <input
            className="customer-form-input"
            id="customer-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter customer name"
          />
        </div>

        <div className="customer-form-field customer-form-field-half">
          <label className="customer-form-label" htmlFor="customer-phone">
            Phone <span className="customer-form-required">*</span>
          </label>
          <input
            className="customer-form-input"
            id="customer-phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        <div className="customer-form-field customer-form-field-full">
          <label className="customer-form-label" htmlFor="customer-email">
            Email
          </label>
          <input
            className="customer-form-input"
            id="customer-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>

        <div className="customer-form-field customer-form-field-full">
          <label className="customer-form-label" htmlFor="customer-address">
            Address
          </label>
          <textarea
            className="customer-form-textarea"
            id="customer-address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            placeholder="Enter address"
          />
        </div>
      </div>

      <div className="customer-form-footer">
        <button type="submit" className="customer-form-submit-btn">
          {editingCustomer ? "Update Customer" : "Create Customer"}
        </button>
      </div>
    </form>
  );
}

export default CustomerForm;