import { useState } from "react";
import StatCard from "../components/StatCard.dashboard";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <h1>Dashboard</h1>

      <StatCard title="Total Products" value={dashboard.totalProducts} />

      <StatCard title="Total Customers" value={dashboard.totalCustomers} />

      <StatCard title="Today's Sales" value={dashboard.todaySales} />

      <StatCard title="Revenue" value={dashboard.revenue} />

      <StatCard title="Pending Amount" value={dashboard.pendingAmount} />

      <StatCard title="Inventory Value" value={dashboard.inventoryValue} />
      <button onClick={fetchDashboard}>click me</button>
    </>
  );
}

export default Dashboard;
