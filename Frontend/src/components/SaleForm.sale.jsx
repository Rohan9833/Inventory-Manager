import { useState } from "react";
import "../css/SaleForm.css";
import { Trash2 } from "lucide-react";

function SaleForm({ customers, products, onCreate }) {
  const [formData, setFormData] = useState({
    customer: "",
    discount: 0,
    paidAmount: 0,
    note: "",
    items: [
      {
        product: "",
        quantity: 1,
      },
    ],
  });

  // ==========================
  // Customer / Discount / Note
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // Product Row Change
  // ==========================

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];

    updatedItems[index][field] = field === "quantity" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  // ==========================
  // Add Product
  // ==========================

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          product: "",
          quantity: 1,
        },
      ],
    }));
  };

  // ==========================
  // Remove Product
  // ==========================

  const removeProduct = (index) => {
    if (formData.items.length === 1) {
      return;
    }

    const updatedItems = formData.items.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  // ==========================
  // Calculate Totals
  // ==========================

  const subtotal = formData.items.reduce((sum, item) => {
    const selectedProduct = products.find(
      (product) => product.name === item.product,
    );

    if (!selectedProduct) return sum;

    return sum + selectedProduct.sellingPrice * item.quantity;
  }, 0);
  const totalAmount = subtotal - Number(formData.discount || 0);
  const dueAmount = totalAmount - Number(formData.paidAmount || 0);

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer) {
      return alert("Please select customer.");
    }

    if (formData.items.length === 0) {
      return alert("Please add at least one product.");
    }

    for (const item of formData.items) {
      if (!item.product) {
        return alert("Please select product.");
      }

      if (!item.quantity || item.quantity <= 0) {
        return alert("Please enter valid quantity.");
      }
    }

    if (totalAmount < 0) {
      return alert("Discount cannot be greater than subtotal.");
    }

    if (Number(formData.paidAmount) > totalAmount) {
      return alert("Paid amount cannot be greater than total.");
    }

    await onCreate({
      customer: formData.customer,
      items: formData.items,
      discount: Number(formData.discount),
      paidAmount: Number(formData.paidAmount),
      note: formData.note,
    });

    setFormData({
      customer: "",
      discount: 0,
      paidAmount: 0,
      note: "",
      items: [
        {
          product: "",
          quantity: 1,
        },
      ],
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="sale-form">
        <div className="sale-customer-card">
          <div className="sale-card-title">
            <h3>Customer</h3>
          </div>

          <select
            className="sale-customer-select"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
          >
            <option value="">Select Customer</option>

            {customers.map((customer) => (
              <option key={customer._id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sale-products-card">
          <div className="sale-products-header">
            <div className="sale-products-left">
              <h3>Products</h3>

              <span>{formData.items.length}</span>
            </div>

            <button
              type="button"
              className="sale-add-product-btn"
              onClick={addProduct}
            >
              + Add Product
            </button>
          </div>

          {formData.items.map((item, index) => {
            const selectedProduct = products.find(
              (product) => product.name === item.product,
            );

            const itemTotal = selectedProduct
              ? selectedProduct.sellingPrice * item.quantity
              : 0;

            return (
              <div className="sale-product-item-card" key={index}>
                <div className="sale-product-top">
                  <div className="sale-product-select-wrapper">
                    <label className="sale-product-label">
                      Product {index + 1}
                    </label>

                    <div className="sale-product-select-row">
                      <select
                        className="sale-product-select"
                        value={item.product}
                        onChange={(e) =>
                          handleItemChange(index, "product", e.target.value)
                        }
                      >
                        <option value="">Select Product</option>

                        {products.map((product) => (
                          <option key={product._id} value={product.name}>
                            {product.name}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        className="sale-remove-product-btn"
                        onClick={() => removeProduct(index)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {selectedProduct && (
                  <div className="sale-product-footer">
                    <div className="sale-product-info-box">
                      <small>Price</small>

                      <h4>₹{selectedProduct.sellingPrice}</h4>
                    </div>

                    <div className="sale-product-info-box">
                      <small>Qty</small>

                      <input
                        className="sale-product-quantity-input"
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                      />
                    </div>

                    <div className="sale-product-info-box">
                      <small>Total</small>

                      <h4>₹{itemTotal}</h4>
                    </div>

                    <div className="sale-product-info-box">
                      <small>Stock</small>

                      <h4 className="sale-stock-value">
                        {selectedProduct.quantity}
                      </h4>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* =========================
    Additional Details
========================= */}

        <div className="sale-details-card">
          <div className="sale-card-title">
            <h3>Payment Details</h3>
          </div>

          <div className="sale-details-grid">
            <div className="sale-input-group">
              <label className="sale-discount-label">Discount</label>

              <input
                className="sale-discount-input"
                type="number"
                name="discount"
                min="0"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            <div className="sale-input-group">
              <label className="sale-paid-label">Paid Amount</label>

              <input
                className="sale-paid-input"
                type="number"
                name="paidAmount"
                min="0"
                value={formData.paidAmount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sale-input-group sale-note-group">
            <label className="sale-note-label">Note</label>

            <textarea
              className="sale-note-textarea"
              name="note"
              rows="4"
              value={formData.note}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* =========================
          Summary
          ========================= */}

        <div className="sale-summary-card">
          <div className="sale-card-title">
            <h3>Sale Summary</h3>
          </div>

          <div className="sale-summary-list">
            {/* Row 1 */}

            <div className="sale-summary-item">
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>

            <div className="sale-summary-item">
              <span>Discount</span>
              <strong className="sale-summary-discount">
                - ₹{formData.discount}
              </strong>
            </div>

            <div className="sale-summary-item">
              <span>Total</span>
              <strong className="sale-summary-total">₹{totalAmount}</strong>
            </div>

            {/* Divider */}

            {/* <div className="sale-summary-divider"></div> */}

            {/* Row 2 */}

            <div className="sale-summary-item">
              <span>Paid Amount</span>

              <strong className="sale-paid-value">
                ₹{formData.paidAmount}
              </strong>
            </div>

            <div className="sale-summary-item">
              <span>Due Amount</span>

              <strong className="sale-due-value">₹{dueAmount}</strong>
            </div>

            <div className="sale-summary-item">
              <span>Payment Status</span>

              <strong
                className={
                  dueAmount > 0 ? "sale-payment-unpaid" : "sale-payment-paid"
                }
              >
                {dueAmount > 0 ? "UNPAID" : "PAID"}
              </strong>
            </div>
          </div>

          <button className="sale-create-btn" type="submit">
            Create Sale
          </button>
        </div>
      </form>
    </>
  );
}

export default SaleForm;
