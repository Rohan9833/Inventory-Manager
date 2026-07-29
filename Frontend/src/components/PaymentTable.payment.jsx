function PaymentTable({
  payments = [],
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (
    !Array.isArray(payments) ||
    payments.length === 0
  ) {
    return <h3>No Payments Found.</h3>;
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmDelete) return;

    onDelete(id);
  };

  return (
    <div>
      <h2>Payment History</h2>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
      >
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
                {payment.customer?.name}
              </td>

              {/* Amount */}

              <td>
                ₹{payment.amount}
              </td>

              {/* Method */}

              <td>
                {payment.paymentMethod}
              </td>

              {/* Note */}

              <td>
                {payment.note || "-"}
              </td>

              {/* Date */}

              <td>
                {new Date(
                  payment.createdAt
                ).toLocaleString()}
              </td>

              {/* Actions */}

              <td>
                <button
                  onClick={() =>
                    onEdit(payment)
                  }
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() =>
                    handleDelete(
                      payment._id
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;