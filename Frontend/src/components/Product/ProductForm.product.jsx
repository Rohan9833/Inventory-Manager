import { useEffect, useState } from "react";

import "../../css/ProductForm.css";

function ProductForm({
  categories = [],
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

  // =========================================================
  // EDIT MODE
  // =========================================================

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",

        category:
          editingProduct.category?.name || "",

        costPrice:
          editingProduct.costPrice ?? "",

        sellingPrice:
          editingProduct.sellingPrice ?? "",

        quantity:
          editingProduct.quantity ?? "",
      });
    } else {
      resetForm();
    }
  }, [editingProduct]);

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      costPrice: "",
      sellingPrice: "",
      quantity: "",
    });
  };

  // =========================================================
  // CHANGE
  // =========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      formData.costPrice === "" ||
      formData.sellingPrice === "" ||
      formData.quantity === ""
    ) {
      return alert(
        "Please fill all required fields."
      );
    }

    if (Number(formData.costPrice) < 0) {
      return alert(
        "Cost price cannot be negative."
      );
    }

    if (Number(formData.sellingPrice) < 0) {
      return alert(
        "Selling price cannot be negative."
      );
    }

    if (Number(formData.quantity) < 0) {
      return alert(
        "Quantity cannot be negative."
      );
    }

    const payload = {
      ...formData,

      costPrice: Number(
        formData.costPrice
      ),

      sellingPrice: Number(
        formData.sellingPrice
      ),

      quantity: Number(
        formData.quantity
      ),
    };

    if (editingProduct) {
      await onUpdate(
        editingProduct._id,
        payload
      );
    } else {
      await onCreate(payload);
    }

    resetForm();
  };

  return (
    <form
      className="inv-product-form"
      onSubmit={handleSubmit}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="inv-product-form-heading">

        <div className="inv-product-form-icon">
          +
        </div>

        <div>

          <h2>
            {editingProduct
              ? "Update Product"
              : "Add Product"}
          </h2>

          <p>
            {editingProduct
              ? "Update product details"
              : "Create a new product"}
          </p>

        </div>

      </div>


      {/* =====================================================
          PRODUCT NAME
      ===================================================== */}

      <div className="inv-product-form-field">

        <label>
          Product Name
          <span>*</span>
        </label>

        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
        />

      </div>


      {/* =====================================================
          CATEGORY
      ===================================================== */}

      <div className="inv-product-form-field">

        <label>
          Category
          <span>*</span>
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >

          <option value="">
            Select category
          </option>

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


      {/* =====================================================
          PRICE ROW
      ===================================================== */}

      <div className="inv-product-form-price-grid">

        <div className="inv-product-form-field">

          <label>
            Cost Price (₹)
            <span>*</span>
          </label>

          <input
            type="number"
            name="costPrice"
            placeholder="Enter cost price"
            value={formData.costPrice}
            onChange={handleChange}
            min="0"
          />

        </div>


        <div className="inv-product-form-field">

          <label>
            Selling Price (₹)
            <span>*</span>
          </label>

          <input
            type="number"
            name="sellingPrice"
            placeholder="Enter selling price"
            value={formData.sellingPrice}
            onChange={handleChange}
            min="0"
          />

        </div>

      </div>


      {/* =====================================================
          QUANTITY
      ===================================================== */}

      <div className="inv-product-form-field">

        <label>
          Quantity
          <span>*</span>
        </label>

        <input
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
        />

      </div>


      {/* =====================================================
          SUBMIT
      ===================================================== */}

      <button
        type="submit"
        className="inv-product-form-submit"
      >

        <span>▣</span>

        {editingProduct
          ? "Update Product"
          : "Save Product"}

      </button>

    </form>
  );
}

export default ProductForm;