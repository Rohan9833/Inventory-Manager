import "../../css/CustomerTable.css";

function CustomerTable({
  customers = [],
  loading,
  onEdit,
  onStatus,
}) {
  if (loading) {
    return (
      <div className="inv-customer-table-state">
        <div className="inv-customer-loading-spinner"></div>
        <h3>Loading Customers...</h3>
      </div>
    );
  }

  if (!Array.isArray(customers) || customers.length === 0) {
    return (
      <div className="inv-customer-table-state">
        <div className="inv-customer-empty-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="9" cy="8" r="4" />
            <path d="M2 21v-2a4 4 0 0 1 4-4h6" />
            <path
              d="M16 16h6M19 13v6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h3>No Customers Found</h3>

        <p>Add your first customer to get started.</p>
      </div>
    );
  }

  return (
    <div className="inv-customer-table-container">

      {/* =========================
          TABLE
      ========================= */}

      <div className="inv-customer-table-scroll">

        <table className="inv-customer-table">

          <thead>
            <tr>
              <th className="inv-customer-col-number">#</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Balance</th>
              <th>Status</th>
              <th className="inv-customer-col-actions">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {customers.map((customer, index) => {

              const initials =
                customer.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "?";

              const balance = Number(
                customer.balance || 0
              );

              return (
                <tr key={customer._id}>

                  {/* Number */}

                  <td className="inv-customer-row-number">
                    {index + 1}
                  </td>


                  {/* Customer */}

                  <td>
                    <div className="inv-customer-person">

                      <div className="inv-customer-avatar">
                        {initials}
                      </div>

                      <div className="inv-customer-person-info">

                        <strong>
                          {customer.name || "-"}
                        </strong>

                        <span>
                          Customer ID:{" "}
                          {customer._id
                            ?.slice(-6)
                            .toUpperCase() || "-"}
                        </span>

                      </div>

                    </div>
                  </td>


                  {/* Contact */}

                  <td>
                    <div className="inv-customer-contact">

                      <span className="inv-customer-contact-item">
                        <svg
                          className="inv-customer-contact-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <path
                            d="M6.5 3h3l1.5 4-2 1.5a15 15 0 0 0 6.5 6.5l1.5-2 4 1.5v3c0 1-1 2-2 2C11.3 19.5 4.5 12.7 4.5 4c0-1 1-1 2-1Z"
                          />
                        </svg>

                        <span>
                          {customer.phone || "-"}
                        </span>
                      </span>


                      <span className="inv-customer-contact-item">
                        <svg
                          className="inv-customer-contact-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                          />

                          <path d="m4 7 8 6 8-6" />
                        </svg>

                        <span className="inv-customer-email">
                          {customer.email || "-"}
                        </span>
                      </span>

                    </div>
                  </td>


                  {/* Location */}

                  <td>
                    <div className="inv-customer-location">

                      <svg
                        className="inv-customer-location-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path d="M12 21s7-6.2 7-11A7 7 0 1 0 5 10c0 4.8 7 11 7 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>

                      <span>
                        {customer.address || "-"}
                      </span>

                    </div>
                  </td>


                  {/* Balance */}

                  <td>
                    <span
                      className={
                        balance > 0
                          ? "inv-customer-balance inv-customer-balance-due"
                          : "inv-customer-balance inv-customer-balance-clear"
                      }
                    >
                      ₹{" "}
                      {balance.toLocaleString("en-IN")}
                    </span>
                  </td>


                  {/* Status */}

                  <td>
                    <span
                      className={
                        customer.status
                          ? "inv-customer-status inv-customer-status-active"
                          : "inv-customer-status inv-customer-status-inactive"
                      }
                    >
                      <span className="inv-customer-status-dot"></span>

                      {customer.status
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>


                  {/* Actions */}

                  <td>
                    <div className="inv-customer-actions">

                      {/* Edit */}

                      <button
                        type="button"
                        className="inv-customer-action inv-customer-action-edit"
                        onClick={() =>
                          onEdit(customer)
                        }
                        title="Edit"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                        </svg>
                      </button>


                      {/* View */}

                      <button
                        type="button"
                        className="inv-customer-action inv-customer-action-view"
                        title="View"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>


                      {/* Activate / Deactivate */}

                      <button
                        type="button"
                        className={
                          customer.status
                            ? "inv-customer-action inv-customer-action-deactivate"
                            : "inv-customer-action inv-customer-action-activate"
                        }
                        onClick={() =>
                          onStatus(customer._id)
                        }
                        title={
                          customer.status
                            ? "Deactivate"
                            : "Activate"
                        }
                      >

                        {customer.status ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M6 7h12" />
                            <path d="M9 7V4h6v3" />
                            <path d="M8 7l1 13h6l1-13" />
                            <path d="M10 11v5M14 11v5" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path
                              d="M5 12h14M13 6l6 6-6 6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}

                      </button>

                    </div>
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>


      {/* =========================
          FOOTER
      ========================= */}

      <div className="inv-customer-table-footer">

        <span className="inv-customer-table-count-text">
          Showing {customers.length}{" "}
          {customers.length === 1
            ? "customer"
            : "customers"}
        </span>

        <div className="inv-customer-pagination">

          <button type="button">
            ‹
          </button>

          <button
            type="button"
            className="inv-customer-page-active"
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
            ›
          </button>

        </div>

      </div>

    </div>
  );
}

export default CustomerTable;