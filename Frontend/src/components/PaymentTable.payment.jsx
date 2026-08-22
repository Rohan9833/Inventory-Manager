import "../css/PaymentTable.css";

function PaymentTable({
  payments = [],
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="payment-table-state">
        <h3>Loading Payments...</h3>
      </div>
    );
  }

  if (
    !Array.isArray(payments) ||
    payments.length === 0
  ) {
    return (
      <div className="payment-table-state">
        <h3>No Payments Found.</h3>
      </div>
    );
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmDelete) return;

    onDelete(id);
  };

  return (
    <div className="payment-table-container">

      {/* =========================
          HEADER
      ========================= */}

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

      {/* =========================
          TABLE SCROLL
      ========================= */}

      <div className="payment-table-scroll">
        <table className="payment-table">

          <thead>
            <tr>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Note</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>

                {/* Customer */}

                <td>
                  <div className="payment-table-customer">
                    <div className="payment-table-avatar">
                      {payment.customer?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "?"}
                    </div>

                    <span>
                      {payment.customer?.name || "-"}
                    </span>
                  </div>
                </td>

                {/* Amount */}

                <td>
                  <span className="payment-table-amount">
                    ₹{payment.amount}
                  </span>
                </td>

                {/* Method */}

                <td>
                  <span
                    className={`payment-table-method payment-table-method-${payment.paymentMethod?.toLowerCase()}`}
                  >
                    {payment.paymentMethod}
                  </span>
                </td>

                {/* Note */}

                <td>
                  <span className="payment-table-note">
                    {payment.note || "-"}
                  </span>
                </td>

                {/* Date */}

                <td>
                  <span className="payment-table-date">
                    {new Date(
                      payment.createdAt
                    ).toLocaleString()}
                  </span>
                </td>

                {/* Actions */}

                <td>
                  <div className="payment-table-actions">

                    <button
                      type="button"
                      className="payment-table-edit-btn"
                      onClick={() =>
                        onEdit(payment)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="payment-table-delete-btn"
                      onClick={() =>
                        handleDelete(
                          payment._id
                        )
                      }
                    >
                      Delete
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

export default PaymentTable;