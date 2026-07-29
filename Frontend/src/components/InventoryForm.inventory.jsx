import { useState } from "react";

function InventoryForm({
  products,
  onStockIn,
  onStockOut,
}) {
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
    <form onSubmit={handleSubmit}>
      <h2>Inventory Entry</h2>

      {/* Product */}

      <div>
        <label>Product</label>

        <select
          name="product"
          value={formData.product}
          onChange={handleChange}
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option
              key={product._id}
              value={product._id}
            >
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Type */}

      <div>
        <label>Transaction Type</label>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="IN">Stock In</option>
          <option value="OUT">Stock Out</option>
        </select>
      </div>

      {/* Quantity */}

      <div>
        <label>Quantity</label>

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
        />
      </div>

      {/* Note */}

      <div>
        <label>Note</label>

        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows="3"
          placeholder="Optional note"
        />
      </div>

      <button type="submit">
        {formData.type === "IN"
          ? "Stock In"
          : "Stock Out"}
      </button>
    </form>
  );
}

export default InventoryForm;