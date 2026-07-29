import { useState } from "react";

function SaleForm({
  customers,
  products,
  onCreate,
}) {
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

  const handleItemChange = (
    index,
    field,
    value
  ) => {
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

    const updatedItems =
      formData.items.filter(
        (_, i) => i !== index
      );

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  // ==========================
  // Calculate Totals
  // ==========================

  const subtotal = formData.items.reduce(
    (sum, item) => {
      const selectedProduct =
        products.find(
          (product) =>
            product.name === item.product
        );

      if (!selectedProduct) return sum;

      return (
        sum +
        selectedProduct.sellingPrice *
          item.quantity
      );
    },
    0
  );

  const totalAmount =
    subtotal -
    Number(formData.discount || 0);

  const dueAmount =
    totalAmount -
    Number(formData.paidAmount || 0);

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

    if (formData.items.length === 0) {
      return alert(
        "Please add at least one product."
      );
    }

    for (const item of formData.items) {
      if (!item.product) {
        return alert(
          "Please select product."
        );
      }

      if (
        !item.quantity ||
        item.quantity <= 0
      ) {
        return alert(
          "Please enter valid quantity."
        );
      }
    }

    if (totalAmount < 0) {
      return alert(
        "Discount cannot be greater than subtotal."
      );
    }

    if (
      Number(formData.paidAmount) >
      totalAmount
    ) {
      return alert(
        "Paid amount cannot be greater than total."
      );
    }

    await onCreate({
      customer: formData.customer,
      items: formData.items,
      discount: Number(
        formData.discount
      ),
      paidAmount: Number(
        formData.paidAmount
      ),
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
    <form onSubmit={handleSubmit}>
      <h2>Create Sale</h2>

      {/* Customer */}

      <div>
        <label>Customer</label>

        <select
          name="customer"
          value={formData.customer}
          onChange={handleChange}
        >
          <option value="">
            Select Customer
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

      <hr />

      {/* Products */}

      {formData.items.map(
        (item, index) => {
          const selectedProduct =
            products.find(
              (product) =>
                product.name ===
                item.product
            );

          const itemTotal =
            selectedProduct
              ? selectedProduct.sellingPrice *
                item.quantity
              : 0;

          return (
            <div
              key={index}
              style={{
                border:
                  "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h4>
                Product {index + 1}
              </h4>

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
                  Select Product
                </option>

                {products.map(
                  (product) => (
                    <option
                      key={product._id}
                      value={
                        product.name
                      }
                    >
                      {product.name}
                    </option>
                  )
                )}
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

              {selectedProduct && (
                <div>
                  <p>
                    Price : ₹
                    {
                      selectedProduct.sellingPrice
                    }
                  </p>

                  <p>
                    Total : ₹
                    {itemTotal}
                  </p>

                  <p>
                    Stock :{" "}
                    {
                      selectedProduct.quantity
                    }
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  removeProduct(
                    index
                  )
                }
              >
                Remove
              </button>
            </div>
          );
        }
      )}

      <button
        type="button"
        onClick={addProduct}
      >
        + Add Product
      </button>

      <hr />

      {/* Discount */}

      <div>
        <label>Discount</label>

        <input
          type="number"
          name="discount"
          min="0"
          value={formData.discount}
          onChange={handleChange}
        />
      </div>

      {/* Paid */}

      <div>
        <label>Paid Amount</label>

        <input
          type="number"
          name="paidAmount"
          min="0"
          value={formData.paidAmount}
          onChange={handleChange}
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
        />
      </div>

      <hr />

      {/* Summary */}

      <h3>Summary</h3>

      <p>
        <strong>Subtotal :</strong> ₹
        {subtotal}
      </p>

      <p>
        <strong>Discount :</strong> ₹
        {formData.discount}
      </p>

      <p>
        <strong>Total :</strong> ₹
        {totalAmount}
      </p>

      <p>
        <strong>Paid :</strong> ₹
        {formData.paidAmount}
      </p>

      <p>
        <strong>Due :</strong> ₹
        {dueAmount}
      </p>

      <button type="submit">
        Create Sale
      </button>
    </form>
  );
}

export default SaleForm;