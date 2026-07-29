function InventoryTable({ history, loading }) {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!history.length) {
    return <h3>No Inventory History Found.</h3>;
  }

  return (
    <div>
      <h2>Inventory History</h2>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Note</th>
            <th>Created By</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{item.product?.name}</td>

              <td>
                {item.type === "IN" ? (
                  <span style={{ color: "green" }}>Stock In</span>
                ) : (
                  <span style={{ color: "red" }}>Stock Out</span>
                )}
              </td>

              <td>{item.quantity}</td>

              <td>{item.note || "-"}</td>

              <td>{item.createdBy?.name || item.createdBy || "-"}</td>

              <td>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
