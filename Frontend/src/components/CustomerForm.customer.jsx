import { useEffect, useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <h2>{editingCustomer ? "Update Customer" : "Create Customer"}</h2>

      {/* Name */}

      <div>
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter customer name"
        />
      </div>

      {/* Phone */}

      <div>
        <label>Phone</label>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
      </div>

      {/* Email */}

      <div>
        <label>Email</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
      </div>

      {/* Address */}

      <div>
        <label>Address</label>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          placeholder="Enter address"
        />
      </div>

      <button type="submit">
        {editingCustomer ? "Update Customer" : "Create Customer"}
      </button>
    </form>
  );
}

export default CustomerForm;
