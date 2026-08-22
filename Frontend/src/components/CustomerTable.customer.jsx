import "../css/CustomerTable.css";

function CustomerTable({
  customers = [],
  loading,
  onEdit,
  onStatus,
}) {
  if (loading) {
    return (
      <div className="customer-table-state">
        <h3>Loading Customers...</h3>
      </div>
    );
  }

  if (
    !Array.isArray(customers) ||
    customers.length === 0
  ) {
    return (
      <div className="customer-table-state">
        <h3>No Customers Found.</h3>
      </div>
    );
  }

  return (
    <div className="customer-table-container">

      {/* =========================
          HEADER
      ========================= */}

      <div className="customer-table-header">
        <div>
          <h2 className="customer-table-title">
            Customer List
          </h2>

          <p className="customer-table-subtitle">
            Manage all your customers
          </p>
        </div>

        <div className="customer-table-count">
          {customers.length}{" "}
          {customers.length === 1
            ? "Customer"
            : "Customers"}
        </div>
      </div>

      {/* =========================
          TABLE SCROLL
      ========================= */}

      <div className="customer-table-scroll">
        <table className="customer-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Pending Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>

                {/* Name */}

                <td>
                  <div className="customer-table-customer">
                    <div className="customer-table-avatar">
                      {customer.name
                        ?.charAt(0)
                        ?.toUpperCase() || "?"}
                    </div>

                    <span className="customer-table-name">
                      {customer.name}
                    </span>
                  </div>
                </td>

                {/* Phone */}

                <td>
                  <span className="customer-table-phone">
                    {customer.phone || "-"}
                  </span>
                </td>

                {/* Email */}

                <td>
                  <span className="customer-table-email">
                    {customer.email || "-"}
                  </span>
                </td>

                {/* Address */}

                <td>
                  <span className="customer-table-address">
                    {customer.address || "-"}
                  </span>
                </td>

                {/* Balance */}

                <td>
                  <span
                    className={
                      customer.balance > 0
                        ? "customer-table-balance customer-table-balance-due"
                        : "customer-table-balance customer-table-balance-clear"
                    }
                  >
                    ₹{customer.balance || 0}
                  </span>
                </td>

                {/* Status */}

                <td>
                  {customer.status ? (
                    <span className="customer-table-status customer-table-status-active">
                      <span className="customer-table-status-dot"></span>
                      Active
                    </span>
                  ) : (
                    <span className="customer-table-status customer-table-status-inactive">
                      <span className="customer-table-status-dot"></span>
                      Inactive
                    </span>
                  )}
                </td>

                {/* Actions */}

                <td>
                  <div className="customer-table-actions">

                    <button
                      type="button"
                      className="customer-table-edit-btn"
                      onClick={() =>
                        onEdit(customer)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className={
                        customer.status
                          ? "customer-table-status-btn customer-table-deactivate-btn"
                          : "customer-table-status-btn customer-table-activate-btn"
                      }
                      onClick={() =>
                        onStatus(customer._id)
                      }
                    >
                      {customer.status
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default CustomerTable;