function CustomerTable({
  customers = [],
  loading,
  onEdit,
  onStatus,
}) {
  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!Array.isArray(customers) || customers.length === 0) {
    return <h3>No Customers Found.</h3>;
  }

  return (
    <div>
      <h2>Customer List</h2>

      <table border="1" cellPadding="8" cellSpacing="0">
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
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email || "-"}</td>
              <td>{customer.address || "-"}</td>
              <td>{customer.balance}</td>

              <td>
                {customer.status ? (
                  <span style={{ color: "green" }}>
                    Active
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    Inactive
                  </span>
                )}
              </td>

              <td>
                <button onClick={() => onEdit(customer)}>
                  Edit
                </button>

                <button
                  onClick={() => onStatus(customer._id)}
                >
                  {customer.status
                    ? "Deactivate"
                    : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;