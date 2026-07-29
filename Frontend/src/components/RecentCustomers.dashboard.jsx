function RecentCustomers({ recentCustomers }) {
  return (
    <>
      <h2>Recent Customers</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Balance</th>
            <th>Date Added</th>
          </tr>
        </thead>

        <tbody>
          {recentCustomers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>₹{customer.balance}</td>
              <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default RecentCustomers;