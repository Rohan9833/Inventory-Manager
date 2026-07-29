function SaleTable({
  sales = [],
  loading,
}) {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!Array.isArray(sales) || sales.length === 0) {
    return <h3>No Sales Found.</h3>;
  }

  return (
    <div>
      <h2>Sale History</h2>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>Customer</th>
            <th>Products</th>
            <th>Subtotal</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Due</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              {/* Customer */}

              <td>
                {sale.customer?.name}
              </td>

              {/* Products */}

              <td>
                {sale.items.map(
                  (item, index) => (
                    <div key={index}>
                      {item.product?.name}
                      {" × "}
                      {item.quantity}
                    </div>
                  )
                )}
              </td>

              {/* Amounts */}

              <td>
                ₹{sale.subtotal}
              </td>

              <td>
                ₹{sale.discount}
              </td>

              <td>
                ₹{sale.totalAmount}
              </td>

              <td>
                ₹{sale.paidAmount}
              </td>

              <td>
                ₹{sale.dueAmount}
              </td>

              {/* Payment Status */}

              <td>
                {sale.paymentStatus ===
                "PAID" ? (
                  <span
                    style={{
                      color: "green",
                    }}
                  >
                    Paid
                  </span>
                ) : sale.paymentStatus ===
                  "PARTIAL" ? (
                  <span
                    style={{
                      color: "orange",
                    }}
                  >
                    Partial
                  </span>
                ) : (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Unpaid
                  </span>
                )}
              </td>

              {/* Date */}

              <td>
                {new Date(
                  sale.createdAt
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SaleTable;