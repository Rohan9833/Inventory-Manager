import { useState } from "react";
import "../css/InventoryTable.css";

function InventoryTable({ history = [], loading }) {
  const [visibleColumns, setVisibleColumns] = useState({
    product: true,
    type: true,
    quantity: true,
    note: true,
    createdBy: true,
    date: true,
  });

  const columns = [
    {
      key: "product",
      label: "Product",
    },
    {
      key: "type",
      label: "Type",
    },
    {
      key: "quantity",
      label: "Quantity",
    },
    {
      key: "note",
      label: "Note",
    },
    {
      key: "createdBy",
      label: "Created By",
    },
    {
      key: "date",
      label: "Date",
    },
  ];

  // ==========================
  // Toggle Column
  // ==========================

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="inventory-history-state">
        <div className="inventory-history-loader"></div>

        <p>Loading inventory history...</p>
      </div>
    );
  }

  // ==========================
  // Empty
  // ==========================

  if (!Array.isArray(history) || history.length === 0) {
    return (
      <div className="inventory-history-state">
        <div className="inventory-history-empty-icon">
          📦
        </div>

        <h3>No Inventory History</h3>

        <p>
          Your inventory transactions will appear here.
        </p>
      </div>
    );
  }

  return (
    <section className="inventory-history-container">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="inventory-history-header">

        <div className="inventory-history-heading">
          <h2>Inventory History</h2>

          <p>
            Track all stock in and stock out transactions
          </p>
        </div>

        {/* ==========================
            COLUMN DISPLAY
        ========================== */}

        <div className="inventory-history-column-selector">

          <span className="inventory-history-column-title">
            Display
          </span>

          <div className="inventory-history-column-buttons">
            {columns.map((column) => (
              <button
                key={column.key}
                type="button"
                className={`inventory-history-column-btn ${
                  visibleColumns[column.key]
                    ? "inventory-history-column-btn-active"
                    : ""
                }`}
                onClick={() => toggleColumn(column.key)}
              >
                <span className="inventory-history-column-check">
                  {visibleColumns[column.key] ? "✓" : ""}
                </span>

                {column.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ==========================
          TABLE
      ========================== */}

      <div className="inventory-history-table-scroll">

        <table className="inventory-history-table">

          <thead>
            <tr>

              <th className="inventory-history-index-column">
                #
              </th>

              {columns
                .filter(
                  (column) =>
                    visibleColumns[column.key]
                )
                .map((column) => (
                  <th key={column.key}>
                    {column.label}
                  </th>
                ))}

            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr key={item._id}>

                {/* Index */}

                <td className="inventory-history-index-cell">
                  {index + 1}
                </td>

                {/* Product */}

                {visibleColumns.product && (
                  <td className="inventory-history-product-cell">
                    <div className="inventory-history-product">

                      <div className="inventory-history-product-icon">
                        📦
                      </div>

                      <span>
                        {item.product?.name || "-"}
                      </span>

                    </div>
                  </td>
                )}

                {/* Type */}

                {visibleColumns.type && (
                  <td>
                    <span
                      className={`inventory-history-type ${
                        item.type === "IN"
                          ? "inventory-history-type-in"
                          : "inventory-history-type-out"
                      }`}
                    >
                      <span className="inventory-history-type-dot"></span>

                      {item.type === "IN"
                        ? "Stock In"
                        : "Stock Out"}
                    </span>
                  </td>
                )}

                {/* Quantity */}

                {visibleColumns.quantity && (
                  <td>
                    <span
                      className={`inventory-history-quantity ${
                        item.type === "IN"
                          ? "inventory-history-quantity-in"
                          : "inventory-history-quantity-out"
                      }`}
                    >
                      {item.type === "IN" ? "+" : "-"}
                      {item.quantity}
                    </span>
                  </td>
                )}

                {/* Note */}

                {visibleColumns.note && (
                  <td className="inventory-history-note">
                    {item.note || "-"}
                  </td>
                )}

                {/* Created By */}

                {visibleColumns.createdBy && (
                  <td>
                    <div className="inventory-history-user">

                      <div className="inventory-history-user-avatar">
                        {(item.createdBy?.name ||
                          item.createdBy ||
                          "U")
                          .toString()
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <span>
                        {item.createdBy?.name ||
                          item.createdBy ||
                          "-"}
                      </span>

                    </div>
                  </td>
                )}

                {/* Date */}

                {visibleColumns.date && (
                  <td className="inventory-history-date">
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString()
                      : "-"}
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </section>
  );
}

export default InventoryTable;