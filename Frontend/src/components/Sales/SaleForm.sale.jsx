import { useState } from "react";
import "../../css/SaleForm.css";
import { Trash2, UserRound, Package, Plus, FileText } from "lucide-react";

function SaleForm({ customers = [], products = [], onCreate }) {

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

  // ==========================================
  // GENERAL CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // ITEM CHANGE
  // ==========================================

  const handleItemChange = (index, field, value) => {

    const updatedItems = [...formData.items];

    updatedItems[index][field] =
      field === "quantity"
        ? Number(value)
        : value;

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  // ==========================================
  // ADD PRODUCT
  // ==========================================

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

  // ==========================================
  // REMOVE PRODUCT
  // ==========================================

  const removeProduct = (index) => {

    if (formData.items.length === 1) {
      return;
    }

    setFormData((prev) => ({
      ...prev,

      items: prev.items.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // ==========================================
  // TOTAL
  // ==========================================

  const subtotal = formData.items.reduce(
    (sum, item) => {

      const product = products.find(
        (p) => p.name === item.product
      );

      if (!product) return sum;

      return (
        sum +
        Number(product.sellingPrice || 0) *
        Number(item.quantity || 0)
      );
    },
    0
  );

  const discount = Number(
    formData.discount || 0
  );

  const paidAmount = Number(
    formData.paidAmount || 0
  );

  const totalAmount =
    subtotal - discount;

  const dueAmount =
    totalAmount - paidAmount;

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.customer) {
      return alert("Please select customer.");
    }

    for (const item of formData.items) {

      if (!item.product) {
        return alert("Please select product.");
      }

      if (
        !item.quantity ||
        item.quantity <= 0
      ) {
        return alert("Please enter valid quantity.");
      }
    }

    if (discount > subtotal) {
      return alert(
        "Discount cannot be greater than subtotal."
      );
    }

    if (paidAmount > totalAmount) {
      return alert(
        "Paid amount cannot be greater than total."
      );
    }

    await onCreate({
      customer: formData.customer,
      items: formData.items,
      discount,
      paidAmount,
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
    <form
      className="sale-form-new"
      onSubmit={handleSubmit}
    >

      {/* ==================================
          CUSTOMER
      ================================== */}

      <div className="sale-form-card">

        <div className="sale-card-heading">

          <div className="sale-card-heading-icon">
            <UserRound size={18} />
          </div>

          <div>
            <h3>Customer</h3>

            <p>
              Select the customer for this sale
            </p>
          </div>

        </div>


        <label className="sale-field-label">
          Customer <span>*</span>
        </label>

        <div className="sale-select-wrapper">

          <UserRound size={17} />

          <select
            name="customer"
            value={formData.customer}
            onChange={handleChange}
          >
            <option value="">
              Search customer by name or phone...
            </option>

            {customers.map((customer) => (
              <option
                key={customer._id}
                value={customer.name}
              >
                {customer.name}
              </option>
            ))}
          </select>

        </div>

      </div>


      {/* ==================================
          PRODUCTS
      ================================== */}

      <div className="sale-form-card sale-products-card-new">

        <div className="sale-products-heading">

          <div className="sale-card-heading">

            <div className="sale-card-heading-icon">
              <Package size={18} />
            </div>

            <div>
              <h3>Products</h3>

              <p>
                Add products included in this sale
              </p>
            </div>

          </div>


          <button
            type="button"
            className="sale-add-btn"
            onClick={addProduct}
          >
            <Plus size={17} />
            Add Product
          </button>

        </div>


        <div className="sale-product-header-row">

          <span>#</span>
          <span>Product</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Total</span>
          <span>Action</span>

        </div>


        {formData.items.map((item, index) => {

          const selectedProduct =
            products.find(
              (product) =>
                product.name === item.product
            );

          const price =
            selectedProduct?.sellingPrice || 0;

          const itemTotal =
            price * item.quantity;

          return (
            <div
              className="sale-product-row"
              key={index}
            >

              <div className="sale-row-number">
                {index + 1}
              </div>


              <select
                value={item.product}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "product",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Search product...
                </option>

                {products.map((product) => (
                  <option
                    key={product._id}
                    value={product.name}
                  >
                    {product.name}
                  </option>
                ))}
              </select>


              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "quantity",
                    e.target.value
                  )
                }
              />


              <span className="sale-price">
                ₹{Number(price).toFixed(2)}
              </span>


              <strong className="sale-item-total">
                ₹{Number(itemTotal).toFixed(2)}
              </strong>


              <button
                type="button"
                className="sale-delete-btn"
                onClick={() =>
                  removeProduct(index)
                }
              >
                <Trash2 size={16} />
              </button>

            </div>
          );
        })}

      </div>


      {/* ==================================
          PAYMENT DETAILS
      ================================== */}

      <div className="sale-form-card">

        <div className="sale-card-heading">

          <div className="sale-card-heading-icon">
            <FileText size={18} />
          </div>

          <div>
            <h3>Payment Details</h3>

            <p>
              Add discount, payment and notes
            </p>
          </div>

        </div>


        <div className="sale-payment-grid">

          <div>

            <label className="sale-field-label">
              Discount
            </label>

            <input
              className="sale-modern-input"
              type="number"
              min="0"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />

          </div>


          <div>

            <label className="sale-field-label">
              Amount Paid
            </label>

            <input
              className="sale-modern-input"
              type="number"
              min="0"
              name="paidAmount"
              value={formData.paidAmount}
              onChange={handleChange}
            />

          </div>

        </div>


        <div className="sale-note-wrapper">

          <label className="sale-field-label">
            Notes
          </label>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Add any notes for this sale..."
          />

        </div>

      </div>


      {/* Hidden submit button.
          Actual visual button can be connected
          later to the right summary. */}

      <button
        className="sale-hidden-submit"
        type="submit"
      >
        Create Sale
      </button>

    </form>
  );
}

export default SaleForm;