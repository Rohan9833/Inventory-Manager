import { useState } from "react";
import {
  Eye,
  Printer,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

import "../../css/SaleTable.css";

function SaleTable({ sales = [], loading }) {
  // =====================================================
  // VISIBLE COLUMNS
  // =====================================================

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

  const [showColumnSelector, setShowColumnSelector] =
    useState(false);

  // =====================================================
  // COLUMNS
  // =====================================================

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

  // =====================================================
  // TOGGLE COLUMN
  // =====================================================

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // =====================================================
  // CURRENTLY VISIBLE COLUMNS
  // =====================================================

  const visibleColumnList = columns.filter(
    (column) => visibleColumns[column.key]
  );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="sale-table-container">
        <div className="sale-table-loading">
          Loading sales...
        </div>
      </div>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (!Array.isArray(sales) || sales.length === 0) {
    return (
      <div className="sale-table-container">
        <div className="sale-table-empty">
          No Sales Found.
        </div>
      </div>
    );
  }

  return (
    <div className="sale-table-container">

      {/* =================================================
          TOP SECTION
      ================================================= */}

      <div className="sale-table-top">

        {/* TITLE */}

        <div className="sale-table-title">
          <h2>Sale History</h2>

          <p>
            Manage all your sales
          </p>
        </div>


        {/* =================================================
            COLUMN SELECTOR
        ================================================= */}

        <div className="sale-table-column-area">

          <button
            type="button"
            className="sale-column-toggle-btn"
            onClick={() =>
              setShowColumnSelector(
                (prev) => !prev
              )
            }
          >
            <SlidersHorizontal size={15} />

            <span>
              Columns
            </span>

            <ChevronDown
              size={14}
              className={
                showColumnSelector
                  ? "sale-column-arrow-open"
                  : ""
              }
            />
          </button>


          {/* COLUMN DROPDOWN */}

          {showColumnSelector && (
            <div className="sale-table-column-selector">

              <div className="sale-column-selector-header">

                <h4>
                  Visible Columns
                </h4>

                <span>
                  Select columns to display
                </span>

              </div>


              <div className="sale-table-checkbox-grid">

                {columns.map((column) => (

                  <label
                    key={column.key}
                    className={`sale-table-checkbox-item ${
                      visibleColumns[column.key]
                        ? "sale-column-checked"
                        : ""
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={
                        visibleColumns[column.key]
                      }
                      onChange={() =>
                        toggleColumn(
                          column.key
                        )
                      }
                    />

                    <span>
                      {column.label}
                    </span>

                  </label>

                ))}

              </div>

            </div>
          )}

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="sale-table-wrapper">

        <table className="sale-table">

          <thead>

            <tr>

              {/* NUMBER */}

              <th className="sale-number-column">
                #
              </th>


              {/* VISIBLE COLUMNS */}

              {visibleColumnList.map(
                (column) => (
                  <th
                    key={column.key}
                  >
                    {column.label}
                  </th>
                )
              )}


              {/* ACTIONS */}

              <th>
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {sales.map((sale, index) => {

              const customerName =
                sale.customer?.name ||
                "Unknown Customer";

              const paymentStatus =
                sale.paymentStatus ||
                "UNPAID";

              return (
                <tr
                  key={
                    sale._id ||
                    index
                  }
                >

                  {/* =================================================
                      NUMBER
                  ================================================= */}

                  <td className="sale-number-cell">
                    {index + 1}
                  </td>


                  {/* =================================================
                      DYNAMIC COLUMNS
                  ================================================= */}

                  {visibleColumnList.map(
                    (column) => {

                      switch (column.key) {

                        // ============================================
                        // CUSTOMER
                        // ============================================

                        case "customer":
                          return (
                            <td
                              key={column.key}
                              className="sale-table-cell"
                            >

                              <div className="sale-customer-cell">

                                <div className="sale-customer-avatar">
                                  {customerName
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>

                                <span>
                                  {customerName}
                                </span>

                              </div>

                            </td>
                          );


                        // ============================================
                        // PRODUCTS
                        // ============================================

                        case "products":
                          return (
                            <td
                              key={column.key}
                              className="sale-table-cell"
                            >

                              <div className="sale-table-products">

                                {Array.isArray(
                                  sale.items
                                ) &&
                                  sale.items.map(
                                    (
                                      item,
                                      itemIndex
                                    ) => (

                                      <div
                                        key={
                                          itemIndex
                                        }
                                        className="sale-table-product-item"
                                      >

                                        {item.product?.name ||
                                          "Unknown Product"}

                                        {" × "}

                                        {item.quantity}

                                      </div>

                                    )
                                  )}

                              </div>

                            </td>
                          );


                        // ============================================
                        // SUBTOTAL
                        // ============================================

                        case "subtotal":
                          return (
                            <td
                              key={column.key}
                              className="sale-table-cell"
                            >
                              ₹
                              {Number(
                                sale.subtotal || 0
                              ).toLocaleString(
                                "en-IN",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}
                            </td>
                          );


                        // ============================================
                        // DISCOUNT
                        // ============================================

                        case "discount":
                          return (
                            <td
                              key={column.key}
                              className="sale-table-cell"
                            >
                              ₹
                              {Number(
                                sale.discount || 0
                              ).toLocaleString(
                                "en-IN",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}
                            </td>
                          );


                        // ============================================
                        // TOTAL
                        // ============================================

                        case "total":
                          return (
                            <td
                              key={column.key}
                              className="sale-table-cell sale-money-cell"
                            >
                              ₹
                              {Number(
                                sale.totalAmount || 0
                              ).toLocaleString(
                                "en-IN",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}
                            </td>
                          );


                        // ============================================
                        // PAID
                        // ============================================

                        case "paid":
                          return (
                            <td
                              key={column.key}
                              className="sale-table-cell"
                            >

                              <strong className="sale-paid-value">

                                ₹
                                {Number(
                                  sale.paidAmount || 0
                                ).toLocaleString(
                                  "en-IN",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}

                              </strong>

                            </td>
                          );


                        // ============================================
                        // DUE
                        // ============================================

                        case "due":
                          return (
                            <td
                              key={column.key}
                              className="sale-table-cell"
                            >

                              <strong
                                className={
                                  Number(
                                    sale.dueAmount || 0
                                  ) > 0
                                    ? "sale-due-value"
                                    : "sale-no-due-value"
                                }
                              >

                                ₹
                                {Number(
                                  sale.dueAmount || 0
                                ).toLocaleString(
                                  "en-IN",
                                  {
                                    minimumFractionDigits: 2,
                                  }
                                )}

                              </strong>

                            </td>
                          );


                        // ============================================
                        // STATUS
                        // ============================================

                        case "status":
                          return (
                            <td
                              key={column.key}
                              className="sale-table-cell"
                            >

                              <span
                                className={`sale-table-status ${
                                  paymentStatus === "PAID"
                                    ? "sale-table-status-paid"
                                    : paymentStatus === "PARTIAL"
                                    ? "sale-table-status-partial"
                                    : "sale-table-status-unpaid"
                                }`}
                              >

                                <span className="sale-status-dot" />

                                {paymentStatus}

                              </span>

                            </td>
                          );


                        // ============================================
                        // DATE
                        // ============================================

                        case "date":
                          return (
                            <td
                              key={column.key}
                              className="sale-table-cell"
                            >

                              {sale.createdAt
                                ? new Date(
                                    sale.createdAt
                                  ).toLocaleString(
                                    "en-IN"
                                  )
                                : "-"}

                            </td>
                          );


                        // ============================================
                        // DEFAULT
                        // ============================================

                        default:
                          return null;
                      }

                    }
                  )}


                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <td className="sale-table-cell">

                    <div className="sale-table-actions">

                      <button
                        type="button"
                        title="View Sale"
                        onClick={() =>
                          console.log(
                            "View sale:",
                            sale
                          )
                        }
                      >
                        <Eye size={15} />
                      </button>


                      <button
                        type="button"
                        title="Print Sale"
                        onClick={() =>
                          console.log(
                            "Print sale:",
                            sale
                          )
                        }
                      >
                        <Printer size={15} />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>


      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="sale-table-footer">

        <span>
          Showing 1 to{" "}
          {sales.length} of{" "}
          {sales.length} sales
        </span>


        <div className="sale-pagination">

          <button
            type="button"
            disabled
          >
            ‹
          </button>

          <button
            type="button"
            className="active"
          >
            1
          </button>

          <button type="button">
            2
          </button>

          <button type="button">
            3
          </button>

          <button type="button">
            4
          </button>

          <button type="button">
            5
          </button>

          <button type="button">
            ›
          </button>

        </div>

      </div>

    </div>
  );
}

export default SaleTable;