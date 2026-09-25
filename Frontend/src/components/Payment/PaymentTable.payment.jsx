import "../../css/PaymentTable.css";

function PaymentTable({
  payments = [],
  loading,
  onEdit,
  onDelete,
}) {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmDelete) return;

    onDelete(id);
  };

  if (loading) {
    return (
      <div className="payment-table-state">
        <div className="payment-loading-icon">
          ⟳
        </div>

        <h3>Loading Payments...</h3>

        <p>
          Fetching your payment history
        </p>
      </div>
    );
  }

  if (
    !Array.isArray(payments) ||
    payments.length === 0
  ) {
    return (
      <div className="payment-table-state">
        <div className="payment-empty-icon">
          ₹
        </div>

        <h3>No Payments Found</h3>

        <p>
          No payment records match your current filter.
        </p>
      </div>
    );
  }

  return (
    <div className="payment-table-container">

      <div className="payment-table-header">

        <div>
          <h2 className="payment-table-title">
            Payment History
          </h2>

          <p className="payment-table-subtitle">
            Manage all customer payments
          </p>
        </div>

        <div className="payment-table-count">
          {payments.length}{" "}
          {payments.length === 1
            ? "Payment"
            : "Payments"}
        </div>

      </div>

      <div className="payment-table-scroll">

        <table className="payment-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Note</th>
              <th>Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {payments.map((payment, index) => {

              const customerName =
                payment.customer?.name || "-";

              const initials =
                customerName
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "?";

              return (
                <tr key={payment._id}>

                  {/* Number */}

                  <td>
                    <span className="payment-table-number">
                      {index + 1}
                    </span>
                  </td>

                  {/* Customer */}

                  <td>

                    <div className="payment-table-customer">

                      <div className="payment-table-avatar">
                        {initials}
                      </div>

                      <div className="payment-table-customer-info">

                        <strong>
                          {customerName}
                        </strong>

                        <small>
                          Customer
                        </small>

                      </div>

                    </div>

                  </td>

                  {/* Amount */}

                  <td>

                    <span className="payment-table-amount">
                      ₹
                      {Number(
                        payment.amount || 0
                      ).toLocaleString("en-IN")}
                    </span>

                  </td>

                  {/* Method */}

                  <td>

                    <span
                      className={`payment-table-method payment-table-method-${(
                        payment.paymentMethod || ""
                      ).toLowerCase()}`}
                    >
                      {payment.paymentMethod || "-"}
                    </span>

                  </td>

                  {/* Note */}

                  <td>

                    <span className="payment-table-note">
                      {payment.note || "No note"}
                    </span>

                  </td>

                  {/* Date */}

                  <td>

                    <div className="payment-table-date-wrapper">

                      <span className="payment-table-date">
                        {payment.createdAt
                          ? new Date(
                              payment.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </span>

                      <small>
                        {payment.createdAt
                          ? new Date(
                              payment.createdAt
                            ).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : ""}
                      </small>

                    </div>

                  </td>

                  {/* Actions */}

                  <td>

                    <div className="payment-table-actions">

                      <button
                        type="button"
                        className="payment-table-view-btn"
                        title="Edit payment"
                        onClick={() =>
                          onEdit(payment)
                        }
                      >
                        👁
                      </button>

                      <button
                        type="button"
                        className="payment-table-delete-btn"
                        title="Delete payment"
                        onClick={() =>
                          handleDelete(
                            payment._id
                          )
                        }
                      >
                        🗑
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      <div className="payment-table-footer">

        <span>
          Showing {payments.length} payment
          {payments.length !== 1 ? "s" : ""}
        </span>

        <span>
          Updated automatically after each transaction
        </span>

      </div>

    </div>
  );
}

export default PaymentTable;