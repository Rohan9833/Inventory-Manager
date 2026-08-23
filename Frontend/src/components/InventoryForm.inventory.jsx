import { useState } from "react";
import "../css/InventoryForm.css";

function InventoryForm({ products, onStockIn, onStockOut }) {
  const [formData, setFormData] = useState({
    product: "",
    type: "IN",
    quantity: "",
    note: "",
  });

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
      product: "",
      type: "IN",
      quantity: "",
      note: "",
    });
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product) {
      return alert("Please select a product.");
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      return alert("Enter a valid quantity.");
    }

    const payload = {
      ...formData,
      quantity: Number(formData.quantity),
    };

    if (formData.type === "IN") {
      await onStockIn(payload);
    } else {
      await onStockOut(payload);
    }

    resetForm();
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      {/* ================= HEADER ================= */}

      <div className="inventory-form-header">
        <div className="inventory-form-heading">
          <h2 className="inventory-form-title">Inventory Entry</h2>

          <p className="inventory-form-subtitle">
            Manage your stock in and stock out transactions
          </p>
        </div>

        <div
          className={`inventory-form-type-badge ${
            formData.type === "OUT"
              ? "inventory-form-type-badge-out"
              : "inventory-form-type-badge-in"
          }`}
        >
          <span className="inventory-form-type-dot"></span>

          {formData.type === "IN" ? "Stock In" : "Stock Out"}
        </div>
      </div>

      {/* ================= FORM GRID ================= */}

      <div className="inventory-form-grid">
        {/* Product */}

        <div className="inventory-form-field">
          <label
            className="inventory-form-label"
            htmlFor="inventory-product"
          >
            Product
            <span className="inventory-form-required">*</span>
          </label>

          <select
            id="inventory-product"
            className="inventory-form-input"
            name="product"
            value={formData.product}
            onChange={handleChange}
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Transaction Type */}

        <div className="inventory-form-field">
          <label
            className="inventory-form-label"
            htmlFor="inventory-type"
          >
            Transaction Type
          </label>

          <select
            id="inventory-type"
            className="inventory-form-input"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
          </select>
        </div>

        {/* Quantity */}

        <div className="inventory-form-field">
          <label
            className="inventory-form-label"
            htmlFor="inventory-quantity"
          >
            Quantity
            <span className="inventory-form-required">*</span>
          </label>

          <input
            id="inventory-quantity"
            className="inventory-form-input"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            placeholder="Enter quantity"
          />
        </div>

        {/* Note */}

        <div className="inventory-form-field inventory-form-field-full">
          <label
            className="inventory-form-label"
            htmlFor="inventory-note"
          >
            Note
          </label>

          <textarea
            id="inventory-note"
            className="inventory-form-textarea"
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
            placeholder="Add an optional note..."
          />
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div className="inventory-form-footer">
        <button
          type="button"
          className="inventory-form-reset-btn"
          onClick={resetForm}
        >
          Clear
        </button>

        <button
          type="submit"
          className={`inventory-form-submit ${
            formData.type === "OUT"
              ? "inventory-form-submit-out"
              : "inventory-form-submit-in"
          }`}
        >
          {formData.type === "IN" ? "Stock In" : "Stock Out"}
        </button>
      </div>
    </form>
  );
}

export default InventoryForm;