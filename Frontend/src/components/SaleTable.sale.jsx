import { useState } from "react";
// import "./SaleTable.css";

function SaleTable({ sales = [], loading }) {
  const [visibleColumns, setVisibleColumns] = useState({
    customer: true,

    products: true,
  
    subtotal: false,

    discount: false,

    total: true,

    paid: true,

    due: true,

    status: true,

    date: false,
  });

  const columns = [
    {
      key: "customer",
      label: "Customer",
    },

    {
      key: "products",
      label: "Products",
    },

    {
      key: "subtotal",
      label: "Subtotal",
    },

    {
      key: "discount",
      label: "Discount",
    },

    {
      key: "total",
      label: "Total",
    },

    {
      key: "paid",
      label: "Paid",
    },

    {
      key: "due",
      label: "Due",
    },

    {
      key: "status",
      label: "Status",
    },

    {
      key: "date",
      label: "Date",
    },
  ];

  if (loading) {
    return <h2 className="sale-table-loading">Loading...</h2>;
  }

  if (!Array.isArray(sales) || sales.length === 0) {
    return <h2 className="sale-table-empty">No Sales Found.</h2>;
  }

  return (
    <>
      <div className="sale-table-container">
        <div className="sale-table-top">
          <div className="sale-table-title">
            <h2>Sale History</h2>

            <p>Manage all your sales</p>
          </div>

          <div className="sale-table-column-selector">
            <h4>Visible Columns</h4>

            <div className="sale-table-checkbox-grid">
              {columns.map((column) => (
                <label key={column.key} className="sale-table-checkbox-item">
                  <input
                    type="checkbox"
                    checked={visibleColumns[column.key]}
                    onChange={() =>
                      setVisibleColumns((prev) => ({
                        ...prev,
                        [column.key]: !prev[column.key],
                      }))
                    }
                  />

                  <span>{column.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="sale-table-wrapper">
          <table className="sale-table">
            <thead>
              <tr>
                {columns
                  .filter((column) => visibleColumns[column.key])
                  .map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {" "}
              {sales.map((sale) => (
                <tr key={sale._id}>
                  {columns
                    .filter((column) => visibleColumns[column.key])
                    .map((column) => {
                      switch (column.key) {
                        case "customer":
                          return (
                            <td key={column.key} className="sale-table-cell">
                              {sale.customer?.name}
                            </td>
                          );

                        case "products":
                          return (
                            <td key={column.key} className="sale-table-cell">
                              <div className="sale-table-products">
                                {sale.items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="sale-table-product-item"
                                  >
                                    {item.product?.name}
                                    {" × "}
                                    {item.quantity}
                                  </div>
                                ))}
                              </div>
                            </td>
                          );

                        case "subtotal":
                          return (
                            <td key={column.key} className="sale-table-cell">
                              ₹{sale.subtotal}
                            </td>
                          );

                        case "discount":
                          return (
                            <td key={column.key} className="sale-table-cell">
                              ₹{sale.discount}
                            </td>
                          );

                        case "total":
                          return (
                            <td key={column.key} className="sale-table-cell">
                              ₹{sale.totalAmount}
                            </td>
                          );

                        case "paid":
                          return (
                            <td key={column.key} className="sale-table-cell">
                              ₹{sale.paidAmount}
                            </td>
                          );

                        case "due":
                          return (
                            <td key={column.key} className="sale-table-cell">
                              ₹{sale.dueAmount}
                            </td>
                          );

                        case "status":
                          return (
                            <td key={column.key} className="sale-table-cell">
                              <span
                                className={`sale-table-status ${
                                  sale.paymentStatus === "PAID"
                                    ? "sale-table-status-paid"
                                    : sale.paymentStatus === "PARTIAL"
                                      ? "sale-table-status-partial"
                                      : "sale-table-status-unpaid"
                                }`}
                              >
                                {sale.paymentStatus}
                              </span>
                            </td>
                          );

                        case "date":
                          return (
                            <td key={column.key} className="sale-table-cell">
                              {new Date(sale.createdAt).toLocaleString()}
                            </td>
                          );

                        default:
                          return null;
                      }
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SaleTable;
