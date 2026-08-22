import { useEffect, useState } from "react";
import "../css/productform.css"
function ProductForm({
  categories,
  editingProduct,
  onCreate,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    costPrice: "",
    sellingPrice: "",
    quantity: "",
  });

  // =====================================
  // Edit Mode
  // =====================================

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category.name,
        costPrice: editingProduct.costPrice,
        sellingPrice: editingProduct.sellingPrice,
        quantity: editingProduct.quantity,
      });
    } else {
      resetForm();
    }
  }, [editingProduct]);

  // =====================================
  // Reset Form
  // =====================================

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      costPrice: "",
      sellingPrice: "",
      quantity: "",
    });
  };

  // =====================================
  // Handle Change
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      formData.costPrice === "" ||
      formData.sellingPrice === "" ||
      formData.quantity === ""
    ) {
      return alert("Please fill all required fields.");
    }

    if (Number(formData.costPrice) < 0) {
      return alert("Cost price cannot be negative.");
    }

    if (Number(formData.sellingPrice) < 0) {
      return alert("Selling price cannot be negative.");
    }

    if (Number(formData.quantity) < 0) {
      return alert("Quantity cannot be negative.");
    }

    const payload = {
      ...formData,
      costPrice: Number(formData.costPrice),
      sellingPrice: Number(formData.sellingPrice),
      quantity: Number(formData.quantity),
    };

    if (editingProduct) {
      await onUpdate(editingProduct._id, payload);
    } else {
      await onCreate(payload);
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {editingProduct ? "Update Product" : "Create Product"}
      </h2>

      {/* Product Name */}

      <div>
        <label>Product Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter Product Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Category */}

      <div>
        <label>Category</label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category.name}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cost Price */}

      <div>
        <label>Cost Price</label>

        <input
          type="number"
          name="costPrice"
          value={formData.costPrice}
          onChange={handleChange}
        />
      </div>

      {/* Selling Price */}

      <div>
        <label>Selling Price</label>

        <input
          type="number"
          name="sellingPrice"
          value={formData.sellingPrice}
          onChange={handleChange}
        />
      </div>

      {/* Quantity */}

      <div>
        <label>Quantity</label>

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        {editingProduct
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}

export default ProductForm;