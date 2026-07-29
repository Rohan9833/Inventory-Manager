function CustomerBalance({ customerBalances }) {
  return (
    <>
      <h2>Customer Pending Balances</h2>

      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Pending Balance</th>
          </tr>
        </thead>

        <tbody>
          {customerBalances.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>₹{customer.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CustomerBalance;